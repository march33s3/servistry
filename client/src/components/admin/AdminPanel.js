import React, { useState } from 'react';

const AdminPanel = () => {
  const [serviceId, setServiceId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/payment/force-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          serviceId: serviceId.trim(),
          amount: parseFloat(amount),
          reason: reason.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          type: 'success',
          message: data.message,
          details: `Previous: $${data.previousAmount} → New: $${data.newAmount}`
        });
        // Clear form on success
        setServiceId('');
        setAmount('');
        setReason('');
      } else {
        setResult({
          type: 'error',
          message: data.message || 'Update failed'
        });
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: `Error: ${error.message}`
      });
    }

    setLoading(false);
  };

  return (
    <div className="admin-panel">
      <h2>Manual Service Adjustment</h2>
      <p className="instructions">
        Use this to manually adjust service funded amounts after processing refunds through Stripe.
        <br />
        <strong>For refunds:</strong> Use negative amounts (e.g., -25 for $25 refund)
        <br />
        <strong>For corrections:</strong> Use positive amounts (e.g., 10 for $10 addition)
      </p>

      <div className="form-container">
        <div onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="serviceId">Service ID:</label>
            <input
              type="text"
              id="serviceId"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              placeholder="67d8cc763048e85c44bfb4af"
              required
            />
            <small>You can find this in the URL when viewing a service or registry</small>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="-25 (negative for refunds)"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Manual refund processed via Stripe dashboard"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !serviceId || !amount || !reason}
            className={`btn btn-primary ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Processing...' : 'Update Service'}
          </button>
        </div>

        {result && (
          <div className={`result ${result.type}`}>
            <h4>{result.type === 'success' ? '✅ Success' : '❌ Error'}</h4>
            <p>{result.message}</p>
            {result.details && <p className="details">{result.details}</p>}
          </div>
        )}
      </div>

      <div className="quick-reference">
        <h3>Quick Reference</h3>
        <div className="reference-grid">
          <div className="reference-item">
            <strong>Find Service ID:</strong>
            <p>Go to registry → View service → Copy ID from URL</p>
          </div>
          <div className="reference-item">
            <strong>Refund Process:</strong>
            <p>1. Process refund in Stripe dashboard<br />2. Use negative amount here<br />3. Add reason for records</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-panel {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .instructions {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 2rem;
          border-left: 4px solid #007bff;
        }

        .form-container {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }

        .form-group small {
          display: block;
          margin-top: 0.25rem;
          color: #666;
          font-size: 0.875rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn.loading {
          position: relative;
          color: transparent;
        }

        .btn.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          margin: -8px 0 0 -8px;
          border: 2px solid #ffffff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .result {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid;
        }

        .result.success {
          background: #d4edda;
          border-color: #c3e6cb;
          color: #155724;
        }

        .result.error {
          background: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }

        .result h4 {
          margin: 0 0 0.5rem 0;
        }

        .result p {
          margin: 0;
        }

        .details {
          font-weight: 600;
          margin-top: 0.5rem !important;
        }

        .quick-reference {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 4px;
          border: 1px solid #e9ecef;
        }

        .reference-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        .reference-item {
          background: white;
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid #dee2e6;
        }

        .reference-item strong {
          display: block;
          margin-bottom: 0.5rem;
          color: #495057;
        }

        .reference-item p {
          margin: 0;
          font-size: 0.875rem;
          color: #6c757d;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .admin-panel {
            margin: 1rem;
            padding: 1rem;
          }

          .reference-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;