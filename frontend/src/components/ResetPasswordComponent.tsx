import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ResetPasswordComponentData {
    errorMessage?: number;
    token?: string;
}

type ResetPasswordComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const ResetPasswordComponent: React.FC<ResetPasswordComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'parameterName': '',
        'token': '',
        'password': '',
        'confirmPassword': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'confirmPassword': data?.['confirmPassword'] ?? prev['confirmPassword'] ?? '',
                'parameterName': data?.['parameterName'] ?? prev['parameterName'] ?? '',
                'password': data?.['password'] ?? prev['password'] ?? '',
                'token': data?.['token'] ?? prev['token'] ?? '',
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
    const { errorMessage, token } = data;
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
            const rawTarget = actionAttr || '/reset-password' || (typeof window !== 'undefined' ? window.location.pathname : '');
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
        
        
        <div className="card">
            <h2 style={{ textAlign: 'center', marginTop: '0', color: '#2c3e50' }}>Set New Password</h2>
            <p style={{ textAlign: 'center', color: '#718096', fontSize: '13px', marginTop: '-10px', marginBottom: '25px' }}>
                Choose a strong, unique password for your account.
            </p>
        
            {(Boolean(errorMessage)) && (<>
                <div className="alert alert-error">{errorMessage}</div>
            </>)}
        
            <form onSubmit={handleSubmit} action="/reset-password" method="post">
                
                <input type="hidden" name={_csrf?.parameterName} value={_csrf?.token} />
                <input type="hidden" name="token" value={token} />
        
                <label htmlFor="password" style={{ fontWeight: '600', fontSize: '13px', color: '#4a5568' }}>New Password</label>
                <input onChange={handleInputChange} type="password" id="password" name="password" placeholder="Enter new password" required autoComplete="new-password" />
        
                <label htmlFor="confirmPassword" style={{ fontWeight: '600', fontSize: '13px', color: '#4a5568' }}>Confirm New Password</label>
                <input onChange={handleInputChange} type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" required autoComplete="new-password" />
        
                <div style={{ background: '#f7fafc', borderLeft: '3px solid #e67e22', padding: '10px 12px', marginBottom: '15px', fontSize: '12px', color: '#4a5568' }}>
                    <strong>Password Requirements:</strong>
                    <ul style={{ margin: '5px 0 0 15px', padding: '0' }}>
                        <li>8 to 64 characters long</li>
                        <li>At least one uppercase and one lowercase letter</li>
                        <li>At least one number (0-9)</li>
                        <li>At least one special character (@$!%*?&#^()_+-=...)</li>
                    </ul>
                </div>
        
                <button type="submit" className="btn">Update Password</button>
            </form>
        
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a href="/login" style={{ fontSize: '13px', color: '#718096', textDecoration: 'none' }}>Cancel & Return to Login</a>
            </div>
        </div>
        </>
    );
};

export default ResetPasswordComponent;