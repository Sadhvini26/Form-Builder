import FormEditorClient from './FormEditorClient';

export default async function EditFormPage({ params }) {
  const {formId}=await params
  return <FormEditorClient formId={formId} />;
}
