"use client";


import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { db } from 'C:/sadh/Form builder/ai-formbuilder/configs/index.js';
import { forms } from 'C:/sadh/Form builder/ai-formbuilder/configs/schema.js';
import { eq, and } from 'drizzle-orm';
import FormUi from '../edit-form/components_/FormUi';
import { toast } from 'sonner';
import Link from 'next/link'
function ResponsesPage() {
  const { user } = useUser();
  const [formsList, setFormsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      const userEmail = user?.primaryEmailAddress?.emailAddress;

      if (!userEmail) {
        console.warn("⚠️ User email not available yet.");
        return;
      }

      try {
        const result = await db
          .select()
          .from(forms)
          .where(eq(forms.createdBy, userEmail));

        const parsedForms = result.map(form => ({
          ...form,
          jsonform: JSON.parse(form.jsonform),
        }));

        setFormsList(parsedForms);
      } catch (error) {
        console.error("❌ Failed to load forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Your Form Responses</h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading forms...</p>
        </div>
      ) : formsList.length === 0 ? (
        <p className="text-center text-muted">No responses found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {formsList.map((form) => (
            <div className="col" key={form.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {form.jsonform.formTitle || "Untitled Form"}
                  </h5>
                  <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                    {form.jsonform.formSubHeading || "No description"}
                  </p>
                  <Link
                    href={`/responses/${form.id}`}
                    className="btn btn-outline-primary w-100 mt-3"
                  >
                    View Responses →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResponsesPage;
