import React, { useState } from 'react';
import FeildEdit from './FeildEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function FormUi({ jsonform, onFormUpdate }) {
  const [formFields, setFormFields] = useState(jsonform?.formFields || []);
  const [previewMode, setPreviewMode] = useState(false);
  
  if (!jsonform) return null;

  const handleFieldSave = (index, updatedField) => {
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], ...updatedField };
    setFormFields(updatedFields);

    const updatedJsonForm = {
      ...jsonform,
      formFields: updatedFields,
    };

    if (onFormUpdate) {
      onFormUpdate(updatedJsonForm, index, updatedField);
    }
  };
  const handleFieldDelete = (index) => {
  const confirmed = window.confirm("Are you sure you want to delete this field?");
  if (!confirmed) return;

  const updatedFields = formFields.filter((_, i) => i !== index);
  setFormFields(updatedFields);

  const updatedJsonForm = {
    ...jsonform,
    formFields: updatedFields,
  };

  // Send updated form to parent and DB
  onFormUpdate?.(updatedJsonForm);
};

  const handleAddField = () => {
    const newField = {
      fieldName: `field_${formFields.length + 1}`,
      fieldType: 'text',
      formLabel: 'New Field',
      placeholder: 'Enter value',
    };
    const updatedFields = [...formFields, newField];
    setFormFields(updatedFields);

    const updatedJsonForm = {
      ...jsonform,
      formFields: updatedFields,
    };

    if (onFormUpdate) {
      onFormUpdate(updatedJsonForm, formFields.length, newField);
    }
  };

  const renderFieldElement = (field, index) => {
    const { fieldName, fieldType, formLabel, placeholder, options } = field;
    const normalizedPlaceholder = field.placeholder || field.placeholderName || '';
    

    const editIcon = (
      <div className="ms-2">
        <FeildEdit field={field} index={index} onSave={handleFieldSave} onDelete={handleFieldDelete}/>
      </div>
    );

    const baseInput = () => {
      if (fieldType === 'textarea') {
        return (
          <textarea
            name={fieldName}
            placeholder={normalizedPlaceholder ||''}
            className="form-control"
            style={{ resize: 'vertical' }}
          />
        );
      }

      return (
        <input
          type={fieldType}
          name={fieldName}
          placeholder={normalizedPlaceholder || ''}
          className="form-control"
        />
      );
    };

    const groupOptions = () =>
      options?.map((opt, optIndex) => {
        const value = typeof opt === 'object' ? opt.value : opt;
        const label = typeof opt === 'object' ? opt.label : opt;

        return (
          <div className="form-check form-check-inline" key={optIndex}>
            <input
              className="form-check-input"
              type={fieldType}
              name={fieldName}
              id={`${fieldName}_${optIndex}`}
              value={value}
            />
            <label className="form-check-label" htmlFor={`${fieldName}_${optIndex}`}>
              {label}
            </label>
          </div>
        );
      });

    let fieldUI;
    if (fieldType === 'select') {
      fieldUI = (
        <select className="form-select" name={fieldName}>
          <option value="">Select {formLabel}</option>
          {options?.map((opt, idx) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const label = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={idx} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      );
    } else if (fieldType === 'radio' || fieldType === 'checkbox') {
      fieldUI = groupOptions();
    } else {
      fieldUI = baseInput();
    }

    return (
      <div className="mb-3" key={`${fieldName}-${index}`}>
        {fieldType !== 'checkbox' || field.options ? (
          <label className="form-label small fw-semibold">{formLabel}</label>
        ) : null}
        <div className="d-flex align-items-start gap-2">
          <div className="flex-grow-1">{fieldUI}</div>
          {!previewMode && editIcon}
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div
        className="card shadow-sm p-4"
        style={{ width: '100%', maxWidth: '700px', borderRadius: '16px' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-primary">{jsonform.formTitle}</h4>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit Form' : 'Preview Form'}
          </Button>
        </div>
        {jsonform.formSubHeading && (
          <p className="text-muted small">{jsonform.formSubHeading}</p>
        )}

        <form className="pt-2">
          {formFields.map((field, index) => renderFieldElement(field, index))}
          {!previewMode && (
            <div className="d-flex justify-content-end mt-3">
              <Button variant="success" size="sm" onClick={handleAddField}>
                + Add Field
              </Button>
            </div>
          )}
          {previewMode && (
            <div className="text-center mt-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormUi;
