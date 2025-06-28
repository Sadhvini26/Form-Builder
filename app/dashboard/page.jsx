'use client';

import React, { useEffect, useState } from 'react';
import { db } from 'C:/sadh/Form builder/ai-formbuilder/configs/index.js';
import { forms } from 'C:/sadh/Form builder/ai-formbuilder/configs/schema.js';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import CreateForm from './_components/CreateForm';
import Link from 'next/link';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';

export default function Page() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const results = await db
          .select()
          .from(forms)
          .where(eq(forms.createdBy, user.primaryEmailAddress.emailAddress));

        const parsedForms = results.map((form) => {
          let parsed = {};
          try {
            parsed = typeof form.jsonform === 'string'
              ? JSON.parse(form.jsonform)
              : form.jsonform;
          } catch (e) {
            console.error('Failed to parse form JSON:', e);
          }
          return {
            ...form,
            jsonform: parsed,
          };
        });

        setFormList(parsedForms);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, [user]);

  // 🧠 Handle Export (defined outside .map)
  const handleExport = (jsonform) => {
    const formJson = JSON.stringify(jsonform, null, 2);
    const blob = new Blob([formJson], { type: "application/json" });
    saveAs(blob, `${jsonform.formTitle || "form"}.json`);
  };

  return (
    <div className="container mt-5 px-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="fw-bold fs-2 m-0">Dashboard</h1>
        <div className="ms-auto">
          <CreateForm />
        </div>
      </div>

      <div className="row g-4">
        {formList.map((form, idx) => (
          <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="fw-semibold mb-2">
                  {form.jsonform?.formTitle || 'Untitled Form'}
                </h5>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {form.jsonform?.formSubHeading || 'No description'}
                </p>
                <Link
                  href={`/edit-form/${form.id}`}
                  className="btn btn-outline-primary w-100 mt-auto"
                >
                  Edit Form
                </Link>
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-2"
                  onClick={() => handleExport(form.jsonform)}
                >
                  Export JSON
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
