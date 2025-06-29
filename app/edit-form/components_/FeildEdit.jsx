import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

function FeildEdit({ field, index, onSave, onDelete }) {
  const [label, setLabel] = useState(field.formLabel || '');
  const [placeholder, setPlaceholder] = useState(field.placeholder || field.placeholderName|| '');
  const [showPopover, setShowPopover] = useState(false);

  const handleSave = () => {
    onSave?.(index, { formLabel: label, placeholder });
    setShowPopover(false);
  };

  const handleToggle = (nextShow) => {
    setShowPopover(nextShow);
    if (nextShow) {
      setLabel(field.formLabel || '');
      setPlaceholder(field.placeholder || '');
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header>Edit Field</Popover.Header>
      <Popover.Body>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="mb-2">
            <label className="form-label">Label</label>
            <input
              className="form-control"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Placeholder</label>
            <input
              className="form-control"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button variant="primary" size="sm" type="submit">
            Save
          </Button>
        </form>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className='d-flex align-items-center gap-2'>
      <OverlayTrigger
        trigger="click"
        placement="left"
        overlay={popover}
        show={showPopover}
        onToggle={handleToggle}
      >
        <div style={{ cursor: 'pointer' }}>
          <Edit size={18} color="gray" />
        </div>
      </OverlayTrigger>

      {/* Trash icon always visible */}
      <div style={{ cursor: 'pointer' }} onClick={() => onDelete?.(index)}>
        <Trash size={18} color="red" />
      </div>
    </div>
  );
}

export default FeildEdit;
