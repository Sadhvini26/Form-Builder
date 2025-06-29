'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { db } from 'C:/sadh/Form builder/ai-formbuilder/configs/index.js';
import { forms } from 'C:/sadh/Form builder/ai-formbuilder/configs/schema.js';
import { eq, and } from 'drizzle-orm';
import FormUi from '../components_/FormUi';
import { toast } from 'sonner';

export default function FormEditorClient({ formId }) {
  const { user } = useUser();
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const numericFormId = Number(formId);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (user) {
      GetFormData();
    }
  }, [user]);

  const GetFormData = async () => {
  console.log('📊 GetFormData started for formId:', formId);

  const numericFormId = Number(formId);
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  if (!numericFormId || !userEmail) {
    console.error("❌ Invalid formId or user email");
    return;
  }

  try {
    const result = await db
      .select()
      .from(forms)
      .where(
        and(
          eq(forms.id, numericFormId),
          eq(forms.createdBy, userEmail)
        )
      );

    console.log('📊 Database query result:', result);

    if (result.length > 0) {
      const formData = result[0];

      let parsedJsonForm;
      try {
        parsedJsonForm = JSON.parse(formData.jsonform);
        console.log("✅ Parsed form JSON:", parsedJsonForm);

        // ✅ Rename "fields" to "formFields" if needed
        if (parsedJsonForm.fields && !parsedJsonForm.formFields) {
          parsedJsonForm.formFields = parsedJsonForm.fields;
          delete parsedJsonForm.fields;
          console.log("🔁 Renamed 'fields' to 'formFields'");
        }

        // ✅ Check if formFields is valid
        if (!Array.isArray(parsedJsonForm.formFields) || parsedJsonForm.formFields.length === 0) {
          console.warn("⚠️ formFields is missing or empty:", parsedJsonForm.formFields);
        } else {
          console.log("✅ Loaded formFields:", parsedJsonForm.formFields);
          parsedJsonForm.formFields.forEach((field, idx) => {
            console.log(`🔹 Field ${idx + 1}:`, field);
          });
        }

      } catch (parseError) {
        console.error('❌ Error parsing JSON form:', parseError);
        console.log('📊 Raw jsonform string:', formData.jsonform);
        throw new Error('Invalid JSON format in form data');
      }

      const finalForm = {
        ...formData,
        jsonform: parsedJsonForm
      };

      setForm(finalForm);
      console.log('✅ Form state updated successfully');
    } else {
      console.log('❌ No form found with the given criteria');
      toast.error('Form not found or access denied');
    }
  } catch (error) {
    console.error('❌ Error in GetFormData:', error);
    toast.error('Error loading form data');
  }
};


  useEffect(() => {
    if (form) {
      console.log('📝 Final loaded form:', form);
      console.log('📝 Form Title:', form.jsonform?.formTitle);
      console.log('📝 Fields:', form.fields);

      form.jsonform?.fields?.forEach((field, idx) => {
        console.log(`🔹 Field ${idx + 1}`, field);
      });
    }
  }, [form]);

  const handleFormUpdate = async (updatedJsonForm, fieldIndex, updatedField) => {
    setIsLoading(true);
    try {
      const result = await db
        .update(forms)
        .set({
          jsonform: JSON.stringify(updatedJsonForm)
        })
        .where(
          and(
            eq(forms.id, Number(formId)),
            eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        )
        .returning({ id: forms.id });

      if (result.length > 0) {
        setForm((prevForm) => ({
          ...prevForm,
          jsonform: updatedJsonForm
        }));
        toast.success('Field updated successfully!');
      } else {
        toast.error('Database update failed.');
        await GetFormData(); // reload on failure
      }
    } catch (error) {
      console.error('❌ Error updating form:', error);
      toast.error('Error updating field');
      await GetFormData(); // reload on error
    } finally {
      setIsLoading(false);
    }
  };

  if (!form) {
    return (
      <div className="container-fluid layout-container">
        <div className="row min-vh-100">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading form...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid layout-container">
      <div>

        {/* Main Form UI */}
        <div className="col-md-8 offset-md-1 content-area p-4">
          {isLoading && (
            <div className="alert alert-info d-flex align-items-center mb-3">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Saving changes...
            </div>
          )}
          <FormUi
            jsonform={form?.jsonform}
            onFormUpdate={handleFormUpdate}
            // previewMode={preview}
          />
        </div>
      </div>
    </div>
  );
}
