// 'use client';
// // 'use server'
// import React, { useState } from 'react';
// import {AiChatSession} from 'C:/sadh/Form builder/ai-formbuilder/configs/AiModal.js'
// import { db } from 'C:/sadh/Form builder/ai-formbuilder/configs/index.js'
// import { forms } from 'C:/sadh/Form builder/ai-formbuilder/configs/schema.js'
// import {useUser} from '@clerk/nextjs'
// import moment from 'moment';
// import { useRouter } from 'next/navigation';
// import { Loader2 } from 'lucide-react';
// const PROMPT=" On the basis of description please give form in JSON format with form title, form subheading, form field, field type, form name, placeholder name, and form label. In JSON format."

// function CreateForm() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formText, setFormText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const {user}=useUser();
//   const route=useRouter();
//   const handleCreate = async() => {
//     if (!formText.trim()) {
//       alert('Please enter a form description');
//       return;
//     }
//     console.log(user);
    
//     console.log('Form created with content:', formText);
//     setLoading(true);
    
//     try {
//       const result = await AiChatSession.sendMessage("Description: " + formText + PROMPT);
//       const responseText = await result.response.text();
//       console.log('AI Response:', responseText);
//       // const responseText = await result.response.text();
// let formObject;

// try {
//   // formObject = JSON.parse(responseText); // already the full form!
//   console.log("Parsed form object:", responseText);
// } catch (error) {
//   console.error("Failed to parse AI response:", error.message);
// }

//       // const formObject = JSON.parse(responseText.jsonform);
//       // // Parse the JSON response
//       // const json = JSON.parse(responseText);
//       // console.log('Parsed JSON:', json);
//       // const responseText = JSON.stringify({
//       //   formTitle: "Feedback Form",
//       //   formSubHeading: "We value your feedback!",
//       //   formName: "feedbackForm",
//       //   formFields: [
//       //     {
//       //       fieldName: "name",
//       //       placeholder: "Enter your name",
//       //       label: "Full Name"
//       //     },
//       //     {
//       //       fieldName: "email",
//       //       placeholder: "Enter your email",
//       //       label: "Email Address"
//       //     },
//       //     {
//       //       fieldName: "feedback",
//       //       placeholder: "Write your feedback here...",
//       //       label: "Feedback"
//       //     }
//       //   ]
//       // });
//       // Insert into database
//       const resp = await db.insert(forms).values({
//         jsonform: responseText,
//         createdBy: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format('DD/MM/yyyy')
//       }).returning({id: forms.id});
      
//       console.log('Database response:', resp);
//       if(resp[0].id){
//         route.push('/edit-form/'+resp[0].id)
//       }
//       setFormText('');
//       setIsOpen(false);
      
//     } catch (error) {
//       console.error('Error creating form:', error);
//       alert('Error creating form. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormText('');
//     setIsOpen(false);
//     setLoading(false);
//   };

//   const openModal = () => {
//     console.log('Opening modal...');
//     setIsOpen(true);
//     console.log('Modal state should be:', true);
//   };

//   console.log('Current modal state:', isOpen);

//   return (
//     <div>
//       {/* Button to open modal */}
//       <button className="btn btn-primary" onClick={openModal}>
//         + Create Form
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div style={{
//           position: 'fixed',
//           top: '0',
//           left: '0',
//           width: '100vw',
//           height: '100vh',
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: '9999'
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '8px',
//             width: '90%',
//             maxWidth: '500px',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//           }}>
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between', 
//               alignItems: 'center',
//               marginBottom: '20px',
//               borderBottom: '1px solid #dee2e6',
//               paddingBottom: '10px'
//             }}>
//               <h5 style={{ margin: '0' }}>Create a Form</h5>
//               <button 
//                 onClick={handleCancel}
//                 disabled={loading}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '24px',
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                   padding: '0',
//                   width: '30px',
//                   height: '30px',
//                   opacity: loading ? 0.5 : 1
//                 }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <div style={{ marginBottom: '20px' }}>
//               <textarea
//                 className="form-control"
//                 rows="6"
//                 placeholder="Enter your form description here... (e.g., Student registration for coding workshop on React & React Native)"
//                 value={formText}
//                 onChange={(e) => setFormText(e.target.value)}
//                 disabled={loading}
//                 style={{ 
//                   width: '100%',
//                   padding: '10px',
//                   border: '1px solid #ced4da',
//                   borderRadius: '4px',
//                   resize: 'vertical',
//                   opacity: loading ? 0.7 : 1
//                 }}
//               />
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'flex-end', 
//               gap: '10px' 
//             }}>
//               <button 
//                 className="btn btn-secondary" 
//                 onClick={handleCancel}
//                 disabled={loading}
//                 style={{
//                   padding: '8px 16px',
//                   backgroundColor: '#6c757d',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                   opacity: loading ? 0.7 : 1
//                 }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="btn btn-primary" 
//                 onClick={handleCreate}
//                 disabled={loading || !formText.trim()}
//                 style={{
//                   padding: '8px 16px',
//                   backgroundColor: loading || !formText.trim() ? '#6c757d' : '#0d6efd',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: loading || !formText.trim() ? 'not-allowed' : 'pointer'
//                 }}
//               >
//                 {loading ? 'Creating...' : 'Create'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CreateForm;

'use client';

// 'use client';
// // 'use server'
import React, { useState } from 'react';
import {AiChatSession} from 'C:/sadh/Form builder/ai-formbuilder/configs/AiModal.js'
import { db } from 'C:/sadh/Form builder/ai-formbuilder/configs/index.js'
import { forms } from 'C:/sadh/Form builder/ai-formbuilder/configs/schema.js'
import {useUser} from '@clerk/nextjs'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const PROMPT = "On the basis of description please give form in JSON format with form title, form subheading, form field, field type, form name, placeholder name, and form label. In JSON format.";

function CreateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formText, setFormText] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleCreate = async () => {
    if (!formText.trim()) {
      alert('Please enter a form description');
      return;
    }

    setLoading(true);
    try {
      const result = await AiChatSession.sendMessage("Description: " + formText + PROMPT);
      const responseText = await result.response.text();
      console.log('AI Response:', responseText);

      let parsedForm;
      try {
        parsedForm = JSON.parse(responseText);
        console.log("Parsed form object:", parsedForm);
      } catch (error) {
        console.error("Invalid JSON from AI:", error);
        alert("Failed to parse form. Please try again.");
        setLoading(false);
        return;
      }

      const dbResponse = await db.insert(forms).values({
        jsonform: JSON.stringify(parsedForm),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD/MM/yyyy'),
      }).returning({ id: forms.id });

      console.log('Form saved to DB:', dbResponse);

      if (dbResponse[0]?.id) {
        router.push(`/edit-form/${dbResponse[0].id}`);
      }
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        + Create Form
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
          }}>
            <h5>Create a Form</h5>
            <textarea
              rows="6"
              placeholder="Enter your form description..."
              className="form-control mb-3"
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              disabled={loading}
            />
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={() => setIsOpen(false)} disabled={loading}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreate}
                disabled={loading || !formText.trim()}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateForm;
