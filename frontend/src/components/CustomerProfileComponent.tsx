import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type CustomerProfileComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const CustomerProfileComponent: React.FC<CustomerProfileComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'parameterName': '',
        'revealTargetField': '',
        'revealLoanId': '',
        'revealReason': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'parameterName': data?.['parameterName'] ?? prev['parameterName'] ?? '',
                'revealLoanId': data?.['revealLoanId'] ?? prev['revealLoanId'] ?? '',
                'revealReason': data?.['revealReason'] ?? prev['revealReason'] ?? '',
                'revealTargetField': data?.['revealTargetField'] ?? prev['revealTargetField'] ?? '',
            }));
        }
    }, [data]);


    let searchParams: URLSearchParams;
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        [searchParams] = useSearchParams();
    } catch {
        searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    }
    const param = { ...Object.fromEntries(searchParams.entries()), ...(data?.param || {}) };
    const _csrf = (data?._csrf || {
        parameterName: '_csrf',
        token: (typeof document !== 'undefined' ? document.querySelector('meta[name="_csrf"]')?.getAttribute('content') : '') || ''
    });
    const { Customer, Please, borrower, bounced, communication, delivery, during, email, failed, mobile, outreach, profile, update, verify } = data;
    const userObj = (data?.userObj || data?.sessionScope?.user || data?.currentUser || data?.user || null);
    const resetInactivity = (...args: any[]) => {
        try {
            if (typeof (window as any).resetInactivity === 'function') {
                return (window as any).resetInactivity(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const showWarningModal = (...args: any[]) => {
        try {
            if (typeof (window as any).showWarningModal === 'function') {
                return (window as any).showWarningModal(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const stayLoggedIn = (...args: any[]) => {
        try {
            if (typeof (window as any).stayLoggedIn === 'function') {
                return (window as any).stayLoggedIn(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const logoutNow = (...args: any[]) => {
        try {
            if (typeof (window as any).logoutNow === 'function') {
                return (window as any).logoutNow(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const openRevealModal = (...args: any[]) => {
        try {
            if (typeof (window as any).openRevealModal === 'function') {
                return (window as any).openRevealModal(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const closeRevealModal = (...args: any[]) => {
        try {
            if (typeof (window as any).closeRevealModal === 'function') {
                return (window as any).closeRevealModal(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const submitRevealRequest = (...args: any[]) => {
        try {
            if (typeof (window as any).submitRevealRequest === 'function') {
                return (window as any).submitRevealRequest(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
useEffect(() => {
        // Preserved from original inline <script> with component-scoped timer/listener tracking & cleanup:
        const _activeTimers: Array<{ type: 'timeout' | 'interval'; id: any }> = [];
        const _activeListeners: Array<{ target: EventTarget; type: string; listener: any; options?: any }> = [];

        const registerTimer = (type: 'timeout' | 'interval', id: any) => {
            _activeTimers.push({ type, id });
            return id;
        };
        const registerListener = (target: EventTarget, type: string, listener: any, options?: any) => {
            _activeListeners.push({ target, type, listener, options });
            target.addEventListener(type, listener, options);
            return listener;
        };

        try {
            (window as any).resetInactivity = resetInactivity;
            (window as any).showWarningModal = showWarningModal;
            (window as any).stayLoggedIn = stayLoggedIn;
            (window as any).logoutNow = logoutNow;
            (window as any).openRevealModal = openRevealModal;
            (window as any).closeRevealModal = closeRevealModal;
            (window as any).submitRevealRequest = submitRevealRequest;
            // Server-side session timeout is exactly 10 minutes (600 seconds)
                // Warning displayed 60 seconds before expiration (at 540 seconds)
                const TOTAL_TIMEOUT_SEC = 600;
                const WARNING_TIME_SEC = 60;
                const INACTIVITY_LIMIT_SEC = TOTAL_TIMEOUT_SEC - WARNING_TIME_SEC; // 540 seconds
            
                let inactivityTimer = 0;
                let warningCountdown = WARNING_TIME_SEC;
                let countdownInterval = null;
                let modalShown = false;
            
                function resetInactivity() {
                    if (!modalShown) {
                        inactivityTimer = 0;
                    }
                }
            
                // Reset inactivity counter on user interactions (mouse, keyboard)
                registerListener(window, 'mousemove', resetInactivity);
                registerListener(window, 'keydown', resetInactivity);
                registerListener(window, 'click', resetInactivity);
            
                registerTimer('interval', window.setInterval(function() {
                    if (!modalShown) {
                        inactivityTimer++;
                        if (inactivityTimer >= INACTIVITY_LIMIT_SEC) {
                            showWarningModal();
                        }
                    }
                }, 1000));
            
                function showWarningModal() {
                    modalShown = true;
                    warningCountdown = WARNING_TIME_SEC;
                    (typeof document !== "undefined" ? document.getElementById("sessionCountdown") : null).innerText = warningCountdown;
                    (typeof document !== "undefined" ? document.getElementById("sessionModal") : null).style.display = 'flex';
            
                    countdownInterval = registerTimer('interval', window.setInterval(function() {
                        warningCountdown--;
                        (typeof document !== "undefined" ? document.getElementById("sessionCountdown") : null).innerText = warningCountdown;
                        if (warningCountdown <= 0) {
                            clearInterval(countdownInterval);
                            // Inactivity limit reached: redirect to login with expired notice
                            window.location.href = '/login?expired=true';
                        }
                    }, 1000));
                }
            
                function stayLoggedIn() {
                    // Send keep-alive request to server with CSRF header
                    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
                    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
            
                    fetch('/session/keep-alive', {
                        method: 'POST',
                        headers: {
                            [csrfHeader]: csrfToken
                        }
                    }).then(response => {
                        if (response.ok) {
                            clearInterval(countdownInterval);
                            modalShown = false;
                            inactivityTimer = 0;
                            (typeof document !== "undefined" ? document.getElementById("sessionModal") : null).style.display = 'none';
                        } else {
                            window.location.href = '/login?expired=true';
                        }
                    }).catch(() => {
                        window.location.href = '/login?expired=true';
                    });
                }
            
                function logoutNow() {
                    // Submit logout form
                    const logoutForm = document.querySelector('.logout-form');
                    if (logoutForm) {
                        logoutForm.submit();
                    } else {
                        window.location.href = '/login?logout=true';
                    }
                }
            let activeField = null;
            
                function openRevealModal(field, label) {
                    activeField = field;
                    (typeof document !== "undefined" ? document.getElementById("revealTargetField") : null).value = field;
                    (typeof document !== "undefined" ? document.getElementById("modalFieldLabel") : null).innerText = label;
                    (typeof document !== "undefined" ? document.getElementById("revealReason") : null).value = '';
                    (typeof document !== "undefined" ? document.getElementById("modalAlert") : null).style.display = 'none';
                    (typeof document !== "undefined" ? document.getElementById("revealModal") : null).style.display = 'flex';
                    (typeof document !== "undefined" ? document.getElementById("revealReason") : null).focus();
                }
            
                function closeRevealModal() {
                    (typeof document !== "undefined" ? document.getElementById("revealModal") : null).style.display = 'none';
                    (typeof document !== "undefined" ? document.getElementById("modalAlert") : null).style.display = 'none';
                    activeField = null;
                }
            
                function submitRevealRequest(event) {
                    event.preventDefault();
                    const field = (typeof document !== "undefined" ? document.getElementById("revealTargetField") : null).value;
                    const loanId = (typeof document !== "undefined" ? document.getElementById("revealLoanId") : null).value;
                    const reason = (typeof document !== "undefined" ? document.getElementById("revealReason") : null).value.trim();
                    const modalAlert = (typeof document !== "undefined" ? document.getElementById("modalAlert") : null);
                    const confirmBtn = (typeof document !== "undefined" ? document.getElementById("confirmRevealBtn") : null);
            
                    if (reason.length < 8) {
                        modalAlert.innerText = 'Justification must be at least 8 characters long.';
                        modalAlert.style.display = 'block';
                        return;
                    }
            
                    const csrfTokenMeta = document.querySelector('meta[name="_csrf"]');
                    const csrfHeaderMeta = document.querySelector('meta[name="_csrf_header"]');
                    const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';
                    const csrfHeader = csrfHeaderMeta ? csrfHeaderMeta.getAttribute('content') : 'X-CSRF-TOKEN';
            
                    confirmBtn.disabled = true;
                    confirmBtn.innerText = 'Verifying...';
            
                    fetch('/loan-search/reveal', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            [csrfHeader]: csrfToken
                        },
                        body: JSON.stringify({
                            loanId: parseInt(loanId),
                            field: field,
                            reason: reason
                        })
                    })
                    .then(response => response.json().then(data => ({ status: response.status, body: data })))
                    .then(result => {
                        confirmBtn.disabled = false;
                        confirmBtn.innerText = 'Confirm & Reveal';
            
                        if (result.status === 200 && result.body.success) {
                            // Update field value in DOM
                            const targetEl = document.getElementById('fieldVal-' + field);
                            if (targetEl) {
                                targetEl.innerHTML = '<span style="color:#276749; font-weight:700;">' + result.body.unmaskedValue + '</span> ' +
                                    '<span style="font-size:11px; background:#c6f6d5; color:#22543d; padding:2px 6px; border-radius:8px; margin-left:6px;">REVEALED</span>';
                            }
                            // Disable button
                            const btnEl = document.getElementById('revealBtn-' + field);
                            if (btnEl) {
                                btnEl.disabled = true;
                                btnEl.innerText = 'Unmasked';
                                btnEl.style.background = '#a0aec0';
                                btnEl.style.cursor = 'default';
                            }
                            closeRevealModal();
                        } else {
                            modalAlert.innerText = result.body.message || 'Authorization failed or loan is outside your permitted branch.';
                            modalAlert.style.display = 'block';
                        }
                    })
                    .catch(err => {
                        confirmBtn.disabled = false;
                        confirmBtn.innerText = 'Confirm & Reveal';
                        modalAlert.innerText = 'Error communicating with security service: ' + err.message;
                        modalAlert.style.display = 'block';
                    });
                }
        } catch (e) {
            console.warn(e);
        }

        return () => {
            _activeTimers.forEach(t => {
                try {
                    if (t.type === 'timeout') clearTimeout(t.id);
                    else if (t.type === 'interval') clearInterval(t.id);
                } catch (e) {}
            });
            _activeListeners.forEach(l => {
                try { l.target.removeEventListener(l.type, l.listener, l.options); } catch (e) {}
            });
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const formEl = e.currentTarget;
            const actionAttr = formEl ? formEl.getAttribute('action') : null;
            const rawTarget = actionAttr || '' || (typeof window !== 'undefined' ? window.location.pathname : '');
            const formMethod = (formEl ? formEl.getAttribute('method') : null) || 'POST';
            const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '') : '';
            const targetUrl = (apiBase && !rawTarget.startsWith('http')) ? `${apiBase}${rawTarget.startsWith('/') ? '' : '/'}${rawTarget}` : rawTarget;
            const csrfToken = (typeof _csrf !== 'undefined' && _csrf?.token) ? _csrf.token : ((typeof document !== 'undefined' ? document.querySelector('meta[name="_csrf"]')?.getAttribute('content') : '') || '');
            const csrfHeader = (typeof document !== 'undefined' ? document.querySelector('meta[name="_csrf_header"]')?.getAttribute('content') : '') || 'X-CSRF-TOKEN';
            const reqHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
            if (csrfToken) {
                reqHeaders[csrfHeader] = csrfToken;
                reqHeaders['X-XSRF-TOKEN'] = csrfToken;
            }
            const payload = (csrfToken && typeof _csrf !== 'undefined' && _csrf?.parameterName) ? { [_csrf.parameterName]: csrfToken, ...formData } : formData;
            let res: Response;
            try {
                res = await fetch(targetUrl, {
                    method: 'POST',
                    headers: reqHeaders,
                    credentials: 'include',
                    body: JSON.stringify(payload),
                });
            } catch (networkErr: any) {
                if (apiBase && !rawTarget.startsWith('http')) {
                    res = await fetch(rawTarget, {
                        method: 'POST',
                        headers: reqHeaders,
                        credentials: 'include',
                        body: JSON.stringify(payload),
                    });
                } else {
                    throw networkErr;
                }
            }
            if (res.ok) {
                setSubmitSuccess(true);
            } else {
                let errorDetail = `Request failed with status ${res.status}`;
                try {
                    const errData = await res.json();
                    if (errData) {
                        const msg = errData.message || errData.error;
                        if (msg) errorDetail = msg;
                    }
                } catch {}
                setSubmitError(errorDetail);
            }
        } catch (err: any) {
            setSubmitError(err?.message || 'Submission failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackendAction = async (
        e: React.MouseEvent<HTMLElement>,
        action: string = "",
    ) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice(
            action
                ? `The original backend action '${action}' has not been migrated to an API endpoint, so the action was not sent.`
                : "This form originally submitted to '/logout' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (<>
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        </>)}
        {submitSuccess && (<>
            <div className="alert alert-success" role="alert">Form submitted successfully.</div>
        </>)}
        {submitError && (<>
            <div className="alert alert-danger" role="alert">{submitError}</div>
        </>)}
<div className="navbar">
            <div className="logo">
                <a href="/">
                    <img src="/images/bank-logo.jpg" alt="Bank of India" className="bank-logo" />
                    Bank of <span className="brand-orange">India</span>
                </a>
            </div>
        
            <div className="nav">
                {
                    (userObj != null) ? (<>
                        <span className="user-badge">
                            👤 {userObj?.name}
                            <span className="role-pill">
                                {
                                    (userObj?.role == 'ROLE_CUSTOMER') ? (<>Customer</>) :
                                    (userObj?.role == 'ROLE_LOAN_OFFICER') ? (<>Loan Officer</>) :
                                    (userObj?.role == 'ROLE_COLLECTIONS_AGENT') ? (<>Collections Agent</>) :
                                    (userObj?.role == 'ROLE_COLLECTIONS_MANAGER') ? (<>Collections Manager</>) :
                                    (userObj?.role == 'ROLE_ADMIN') ? (<>Admin</>) :
                                    (<>{userObj?.role}</>)
                                }
                            </span>
                        </span>
        
                        <a href="/dashboard">Dashboard</a>
        
                        {(userObj?.role == 'ROLE_LOAN_OFFICER' || userObj?.role == 'ROLE_COLLECTIONS_AGENT' || userObj?.role == 'ROLE_COLLECTIONS_MANAGER' || userObj?.role == 'ROLE_ADMIN') && (<>
                            <a href="/loan-search">Loan Search</a>
                        </>)}
        
                        {(userObj?.role == 'ROLE_LOAN_OFFICER' || userObj?.role == 'ROLE_ADMIN') && (<>
                            <a href="/loan-approval.xhtml" style={{ fontWeight: '700', color: '#ED7D16' }}>Loan Approvals (JSF)</a>
                        </>)}
        
                        {(userObj?.role == 'ROLE_ADMIN') && (<>
                            <a href="/admin/staff">Staff Management</a>
                            <a href="/admin/audit-logs">Audit Trail</a>
                            <a href="/admin/reminders/demo" style={{ color: '#d97706', fontWeight: '700' }}>🔔 DPD Reminders Demo</a>
                        </>)}
        
                        {(userObj?.role == 'ROLE_CUSTOMER') && (<>
                            <a href="/applyLoan">Apply Loan</a>
                        </>)}
        
                        <a href="/settings-hub.xhtml" style={{ fontWeight: '700', color: '#0050A4' }}>⚙️ Settings</a>
        
                        <form onSubmit={handleSubmit} className="logout-form" action="/logout" method="post">
                            <input type="hidden" name={_csrf?.parameterName} value={_csrf?.token} />
                            <button type="submit" className="logout-btn">Log Out</button>
                        </form>
                    </>) :
                    (<>
                        <a href="/">Home</a>
                        <a href="/login">Login</a>
                        <a href="/register">Sign Up</a>
                    </>)
                }
            </div>
        </div>
        
        
        {(userObj != null) && (<>
        <div id="sessionModal">
            <div className="modal-content">
                <h3 style={{ marginTop: '0', color: '#2d3748' }}>Session Inactivity Warning</h3>
                <p style={{ color: '#718096', fontSize: '14px' }}>Your session is about to expire due to inactivity.</p>
                <div className="countdown-timer" id="sessionCountdown">60</div>
                <p style={{ color: '#718096', fontSize: '13px' }}>Seconds remaining before automatic logout</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button className="btn" onClick={() => stayLoggedIn()}>Stay Logged In</button>
                    <button className="btn btn-secondary" onClick={() => logoutNow()}>Log Out Now</button>
                </div>
            </div>
        </div>
        
        
        </>)}
        
        
        <div className="wide-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #edf2f7', paddingBottom: '15px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ margin: '0', color: '#2c3e50' }}>👤 Customer Profile & Loan Portfolio</h2>
                        <span style={{ background: '#ebf8ff', color: '#2b6cb0', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', fontFamily: 'monospace' }}>
                            {profile?.customerId}
                        </span>
                    </div>
                    <p style={{ color: '#718096', fontSize: '14px', margin: '4px 0 0 0' }}>
                        Comprehensive verified KYC and active loan accounts for customer.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ background: '#edf2f7', color: '#2d3748', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', border: '1px solid #cbd5e0' }}>
                        🏢 Branch: <strong>{profile?.branch}</strong>
                    </span>
                    <a href={`/loan-details?loanId=${profile?.primaryLoanId}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px', width: 'auto', textDecoration: 'none', background: '#4f46e5', color: '#ffffff', fontWeight: '600', borderRadius: '6px' }}>
                        🎯 360° Account View
                    </a>
                    <a href="/loan-search" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', width: 'auto', textDecoration: 'none' }}>
                        &larr; Back to Search
                    </a>
                </div>
            </div>
        
            
            <div className="alert alert-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <strong>🛡️ Data Privacy Notice:</strong> In compliance with banking regulations, sensitive personal data (Aadhaar, PAN, Mobile, Email) is masked by default. 
                    All reveal requests require documented business justification and are recorded in the immutable audit log.
                </div>
                <span style={{ background: '#bee3f8', color: '#2b6cb0', padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '700' }}>
                    STRICT AUDIT
                </span>
            </div>
        
            
            {(profile?.contactDetailUpdateRequired) && (<>
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '12px 18px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>⚠️</span>
                    <div>
                        <strong>Contact Detail Update Required:</strong> Customer communication delivery failed or email bounced?.Please verify and update borrower email and mobile number during outreach?.</div>
                </div>
            </>)}
        
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                
                
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Name</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#2d3748', marginTop: '4px' }}>
                        {profile?.customerName}
                    </div>
                    <div style={{ marginTop: '14px', fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase' }}>Customer ID</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#4a5568', fontFamily: 'monospace', marginTop: '2px' }}>
                        {profile?.customerId}
                    </div>
                    <div style={{ marginTop: '14px', fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase' }}>Primary Account Number</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#2b6cb0', fontFamily: 'monospace', marginTop: '2px' }}>
                        {profile?.primaryAccountNumber}
                    </div>
                </div>
        
                
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase' }}>Registered Mobile</div>
                        <button type="button" className="btn" onClick={() => openRevealModal('PHONE', 'Registered Mobile Number')} style={{ padding: '3px 8px', width: 'auto', fontSize: '11px', background: '#4a5568', margin: '0' }} id="revealBtn-PHONE">
                            👁️ Reveal
                        </button>
                    </div>
                    <div id="fieldVal-PHONE" style={{ fontSize: '15px', fontWeight: '600', color: '#2d3748', fontFamily: 'monospace', marginTop: '4px' }}>
                        {profile?.maskedPhone}
                    </div>
        
                    
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase' }}>Email Address</div>
                        <button type="button" className="btn" onClick={() => openRevealModal('EMAIL', 'Customer Email Address')} style={{ padding: '3px 8px', width: 'auto', fontSize: '11px', background: '#4a5568', margin: '0' }} id="revealBtn-EMAIL">
                            👁️ Reveal
                        </button>
                    </div>
                    <div id="fieldVal-EMAIL" style={{ fontSize: '15px', fontWeight: '600', color: '#2d3748', fontFamily: 'monospace', marginTop: '4px' }}>
                        {profile?.maskedEmail}
                    </div>
                </div>
        
                
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase' }}>PAN Number</div>
                        <button type="button" className="btn" onClick={() => openRevealModal('PAN', 'Customer PAN Number')} style={{ padding: '3px 8px', width: 'auto', fontSize: '11px', background: '#4a5568', margin: '0' }} id="revealBtn-PAN">
                            👁️ Reveal
                        </button>
                    </div>
                    <div id="fieldVal-PAN" style={{ fontSize: '15px', fontWeight: '600', color: '#2d3748', fontFamily: 'monospace', marginTop: '4px' }}>
                        {profile?.maskedPan}
                    </div>
        
                    
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase' }}>Aadhaar Number</div>
                        <button type="button" className="btn" onClick={() => openRevealModal('AADHAAR', 'Customer Aadhaar Number')} style={{ padding: '3px 8px', width: 'auto', fontSize: '11px', background: '#4a5568', margin: '0' }} id="revealBtn-AADHAAR">
                            👁️ Reveal
                        </button>
                    </div>
                    <div id="fieldVal-AADHAAR" style={{ fontSize: '15px', fontWeight: '600', color: '#2d3748', fontFamily: 'monospace', marginTop: '4px' }}>
                        {profile?.maskedAadhaar}
                    </div>
                </div>
        
            </div>
        
            
            <h3 style={{ color: '#2d3748', marginTop: '20px', borderBottom: '2px solid #edf2f7', paddingBottom: '10px' }}>
                Authorized Customer Loan Accounts
            </h3>
        
            <div className="modern-table-wrapper"><table>
                <thead>
                    <tr>
                        <th>Loan Account No</th>
                        <th>Principal Amount</th>
                        <th>Interest Rate</th>
                        <th>Tenure</th>
                        <th>Monthly EMI</th>
                        <th>Outstanding Balance</th>
                        <th>Status</th>
                        <th>Branch</th>
                        <th>Origination Date</th>
                    </tr>
                </thead>
                <tbody>
                    {profile?.loans && profile?.loans.map((loan: any, index: number) => (<>
                        <tr>
                            <td>
                                <strong style={{ color: '#2b6cb0', fontFamily: 'monospace', fontSize: '14px' }}>
                                    {loan.accountNumber}
                                </strong>
                            </td>
                            <td>₹{loan.amount}</td>
                            <td>{loan.interest}%</td>
                            <td>{loan.months} Months</td>
                            <td>₹{loan.emi}</td>
                            <td>
                                <strong style="color:{loan.remaining > 0 ? '#c53030' : '#276749'};">
                                    ₹{loan.remaining}
                                </strong>
                            </td>
                            <td>
                                {
                                    (loan.status == 'ACTIVE') ? (<>
                                        <span style={{ color: '#276749', background: '#c6f6d5', padding: '3px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' }}>ACTIVE</span>
                                    </>) :
                                    (loan.status == 'CLOSED') ? (<>
                                        <span style={{ color: '#4a5568', background: '#e2e8f0', padding: '3px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' }}>CLOSED</span>
                                    </>) :
                                    (<>
                                        <span style={{ color: '#b7791f', background: '#feebc8', padding: '3px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' }}>{loan.status}</span>
                                    </>)
                                }
                            </td>
                            <td>
                                <span style={{ background: '#edf2f7', color: '#4a5568', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                                    {loan.branch}
                                </span>
                            </td>
                            <td style={{ fontSize: '13px', color: '#718096' }}>{loan.createdAt}</td>
                        </tr>
                    </>))}
                </tbody>
            </table></div>
        
        </div>
        
        
        <div id="revealModal" style={{ display: 'none', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: '9999', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: '#ffffff', borderRadius: '10px', width: '460px', maxWidth: '90%', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginTop: '0', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🔒 Authorize Sensitive Data Reveal
                </h3>
                <p style={{ color: '#718096', fontSize: '13px', marginTop: '-5px' }}>
                    Requesting unmasked access to <strong id="modalFieldLabel" style={{ color: '#2d3748' }}></strong>.
                </p>
        
                <div id="modalAlert" style={{ display: 'none' }} className="alert alert-error"></div>
        
                <form id="revealForm" onSubmit={() => submitRevealRequest(event)}>
                    <input type="hidden" id="revealTargetField" value="" />
                    <input name="primaryLoanId" type="hidden" id="revealLoanId" value={profile?.primaryLoanId} />
        
                    <label style={{ fontWeight: '600', fontSize: '13px', color: '#4a5568' }}>
                        Business Justification / Purpose of Access <span style={{ color: '#e53e3e' }}>*</span>
                    </label>
                    <textarea onChange={handleInputChange} id="revealReason" rows="3" required minLength="8" maxLength="255" placeholder="e.g. Identity verification for loan disbursal or court notice compliance." style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box', marginTop: '6px', marginBottom: '12px' }}></textarea>
                    
                    <div style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '15px' }}>
                        Note: Minimum 8 characters. Your Officer ID, timestamp, and IP address will be recorded in the audit trail.
                    </div>
        
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => closeRevealModal()} style={{ width: 'auto', padding: '8px 18px', fontSize: '13px' }}>
                            Cancel
                        </button>
                        <button type="submit" className="btn" id="confirmRevealBtn" style={{ width: 'auto', padding: '8px 18px', fontSize: '13px', background: '#e67e22' }}>
                            Confirm & Reveal
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default CustomerProfileComponent;