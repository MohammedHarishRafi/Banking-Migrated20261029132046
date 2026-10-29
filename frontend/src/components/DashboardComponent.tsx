import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface DashboardComponentData {
    officerBranch?: string;
    activeLoansCount?: number;
    pendingLoansCount?: number;
    totalPrincipal?: number;
    totalRemaining?: number;
    overdueLoansCount?: number;
    totalOverdueAmount?: number;
    totalLoansCount?: number;
    parRate?: string;
    dpdCurrentCount?: number;
    dpdCurrentAmount?: number;
    dpdSma0Count?: number;
    dpdSma0Amount?: number;
    dpdSma1Count?: number;
    dpdSma1Amount?: number;
    dpdSma2Count?: number;
    dpdSma2Amount?: number;
    dpdNpaCount?: number;
    dpdNpaAmount?: number;
    errorMessage?: number;
}

type DashboardComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const DashboardComponent: React.FC<DashboardComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'parameterName': '',
        'loanId': '',
        'amount': '',
        'transactionReference': '',
        'reason': '',
        'paymentMode': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'amount': data?.['amount'] ?? prev['amount'] ?? '',
                'loanId': data?.['loanId'] ?? prev['loanId'] ?? '',
                'parameterName': data?.['parameterName'] ?? prev['parameterName'] ?? '',
                'paymentMode': data?.['paymentMode'] ?? prev['paymentMode'] ?? '',
                'reason': data?.['reason'] ?? prev['reason'] ?? '',
                'transactionReference': data?.['transactionReference'] ?? prev['transactionReference'] ?? '',
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
    const isStaff = Boolean(data?.isStaff ?? (data?.user?.role ? data.user.role !== 'ROLE_CUSTOMER' : ((data?.userObj?.role ? data.userObj.role !== 'ROLE_CUSTOMER' : false) || (data?.staffUser?.role ? data.staffUser.role !== 'ROLE_CUSTOMER' : false))));
    const { Amortization, Apply, Loan, Payment, Please, REJECTED, You, accounts, activated, active, activeLoanCount, activeLoansCount, application, balance, been, below, borrower, bull, button, click, dpdCurrentAmount, dpdCurrentCount, dpdNpaAmount, dpdNpaCount, dpdSma0Amount, dpdSma0Count, dpdSma1Amount, dpdSma1Count, dpdSma2Amount, dpdSma2Count, errorMessage, generated, has, have, installment, loan, multiple, next, officerBranch, outstandingBalance, overdueLoansCount, parRate, pendingLoanCount, pendingLoansCount, receipt, repay, sanctioned, schedule, specific, status, successMessage, successfully, synchronized, the, to, totalLoanCount, totalLoansCount, totalOverdueAmount, totalPrincipal, totalRemaining, updated, wish, you } = data;
    const [delinquentLoans, setDelinquentLoans] = useState<any[]>(Array.isArray(data?.delinquentLoans) ? data.delinquentLoans : []);
    const [loans, setLoans] = useState<any[]>(Array.isArray(data?.loans) ? data.loans : []);
    const [pendingLoans, setPendingLoans] = useState<any[]>(Array.isArray(data?.pendingLoans) ? data.pendingLoans : []);
    const [recentActivities, setRecentActivities] = useState<any[]>(Array.isArray(data?.recentActivities) ? data.recentActivities : []);
    const [recentCollections, setRecentCollections] = useState<any[]>(Array.isArray(data?.recentCollections) ? data.recentCollections : []);
    useEffect(() => {
        if (Array.isArray(data?.delinquentLoans) && data.delinquentLoans.length > 0) {
            setDelinquentLoans(data.delinquentLoans);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_delinquentloan", "apex_store_delinquentloans", "apex_store_logout", "apex_store_logouts"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setDelinquentLoans(parsed);
                                return;
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Sandbox store read failed:', err);
            }
        };
        syncStore();
        if (typeof window !== 'undefined') {
            window.addEventListener('apex-store-updated', syncStore);
            return () => window.removeEventListener('apex-store-updated', syncStore);
        }
    }, [data?.delinquentLoans]);

    useEffect(() => {
        if (Array.isArray(data?.loans) && data.loans.length > 0) {
            setLoans(data.loans);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_loan", "apex_store_loans", "apex_store_logout", "apex_store_logouts"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setLoans(parsed);
                                return;
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Sandbox store read failed:', err);
            }
        };
        syncStore();
        if (typeof window !== 'undefined') {
            window.addEventListener('apex-store-updated', syncStore);
            return () => window.removeEventListener('apex-store-updated', syncStore);
        }
    }, [data?.loans]);

    useEffect(() => {
        if (Array.isArray(data?.pendingLoans) && data.pendingLoans.length > 0) {
            setPendingLoans(data.pendingLoans);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_pendingloan", "apex_store_pendingloans", "apex_store_logout", "apex_store_logouts"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setPendingLoans(parsed);
                                return;
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Sandbox store read failed:', err);
            }
        };
        syncStore();
        if (typeof window !== 'undefined') {
            window.addEventListener('apex-store-updated', syncStore);
            return () => window.removeEventListener('apex-store-updated', syncStore);
        }
    }, [data?.pendingLoans]);

    useEffect(() => {
        if (Array.isArray(data?.recentActivities) && data.recentActivities.length > 0) {
            setRecentActivities(data.recentActivities);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_recentactivitie", "apex_store_recentactivities", "apex_store_logout", "apex_store_logouts"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setRecentActivities(parsed);
                                return;
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Sandbox store read failed:', err);
            }
        };
        syncStore();
        if (typeof window !== 'undefined') {
            window.addEventListener('apex-store-updated', syncStore);
            return () => window.removeEventListener('apex-store-updated', syncStore);
        }
    }, [data?.recentActivities]);

    useEffect(() => {
        if (Array.isArray(data?.recentCollections) && data.recentCollections.length > 0) {
            setRecentCollections(data.recentCollections);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_recentcollection", "apex_store_recentcollections", "apex_store_logout", "apex_store_logouts"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setRecentCollections(parsed);
                                return;
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Sandbox store read failed:', err);
            }
        };
        syncStore();
        if (typeof window !== 'undefined') {
            window.addEventListener('apex-store-updated', syncStore);
            return () => window.removeEventListener('apex-store-updated', syncStore);
        }
    }, [data?.recentCollections]);
    const userObj = (data?.userObj || data?.sessionScope?.user || data?.currentUser || data?.user || null);
    const staffUser = (data?.staffUser || data?.currentUser || data?.sessionScope?.user || data?.user || null);
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
    const openRejectModal = (...args: any[]) => {
        try {
            if (typeof (window as any).openRejectModal === 'function') {
                return (window as any).openRejectModal(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const closeRejectModal = (...args: any[]) => {
        try {
            if (typeof (window as any).closeRejectModal === 'function') {
                return (window as any).closeRejectModal(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const openCollectionModal = (...args: any[]) => {
        try {
            if (typeof (window as any).openCollectionModal === 'function') {
                return (window as any).openCollectionModal(...args);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const closeCollectionModal = (...args: any[]) => {
        try {
            if (typeof (window as any).closeCollectionModal === 'function') {
                return (window as any).closeCollectionModal(...args);
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
            (window as any).openRejectModal = openRejectModal;
            (window as any).closeRejectModal = closeRejectModal;
            (window as any).openCollectionModal = openCollectionModal;
            (window as any).closeCollectionModal = closeCollectionModal;
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
            function openRejectModal(loanId, accountNumber, borrowerName) {
                            (typeof document !== "undefined" ? document.getElementById("rejectModalLoanId") : null).value = loanId;
                            (typeof document !== "undefined" ? document.getElementById("rejectModalAccount") : null).innerText = accountNumber;
                            (typeof document !== "undefined" ? document.getElementById("rejectModalBorrower") : null).innerText = borrowerName;
                            (typeof document !== "undefined" ? document.getElementById("rejectModal") : null).style.display = 'flex';
                        }
            
                        function closeRejectModal() {
                            (typeof document !== "undefined" ? document.getElementById("rejectModal") : null).style.display = 'none';
                        }
            
                        function openCollectionModal(loanId, accountNumber, borrowerName, remaining, suggestedAmount) {
                            (typeof document !== "undefined" ? document.getElementById("collectModalLoanId") : null).value = loanId;
                            (typeof document !== "undefined" ? document.getElementById("collectModalAccount") : null).innerText = accountNumber;
                            (typeof document !== "undefined" ? document.getElementById("collectModalBorrower") : null).innerText = borrowerName;
                            (typeof document !== "undefined" ? document.getElementById("collectModalBalance") : null).innerText = '₹' + Number(remaining).toLocaleString('en-IN', {minimumFractionDigits: 2});
                            (typeof document !== "undefined" ? document.getElementById("collectModalOverdue") : null).innerText = '₹' + Number(suggestedAmount).toLocaleString('en-IN', {minimumFractionDigits: 2});
                            (typeof document !== "undefined" ? document.getElementById("collectModalAmount") : null).value = suggestedAmount > 0 ? suggestedAmount : remaining;
                            (typeof document !== "undefined" ? document.getElementById("collectModalAmount") : null).max = remaining;
                            (typeof document !== "undefined" ? document.getElementById("collectModalRef") : null).value = 'COL' + Date.now();
                            (typeof document !== "undefined" ? document.getElementById("collectionModal") : null).style.display = 'flex';
                        }
            
                        function closeCollectionModal() {
                            (typeof document !== "undefined" ? document.getElementById("collectionModal") : null).style.display = 'none';
                        }
            
                        // Close modals on clicking backdrop
                        registerListener(window, 'click', function(event) {
                            const rejectModal = (typeof document !== "undefined" ? document.getElementById("rejectModal") : null);
                            const collectModal = (typeof document !== "undefined" ? document.getElementById("collectionModal") : null);
                            if (event.target === rejectModal) {
                                closeRejectModal();
                            }
                            if (event.target === collectModal) {
                                closeCollectionModal();
                            }
                        });
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
            const rawTarget = actionAttr || '/staff/loans/approve' || (typeof window !== 'undefined' ? window.location.pathname : '');
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
        
        
        <div style={{ padding: '10px 20px 40px 20px' }}>
        
        {
            
            (isStaff) ? (<>
                <div className="staff-dashboard">
        
                    
                    {(param?.approved == 'true') && (<>
                        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
                            ✅ <strong>Application Approved:</strong> Loan application has been successfully sanctioned and activated?.Amortization schedule has been generated?.</div>
                    </>)}
                    {(param?.rejected == 'true') && (<>
                        <div className="alert alert-info" style={{ marginBottom: '20px' }}>
                            ℹ️ <strong>Application Rejected:</strong> Loan application status updated to REJECTED?.</div>
                    </>)}
                    {(param?.collectionRecorded == 'true') && (<>
                        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
                            ✅ <strong>Collection Recorded:</strong> Payment receipt generated, borrower balance updated, and installment schedule synchronized?.</div>
                    </>)}
        
                    
                    <div className="staff-banner">
                        <div>
                            <h1 className="staff-banner-title">
                                {
                                    (staffUser?.role == 'ROLE_LOAN_OFFICER') ? (<>🏛️ Loan Officer Operations Hub</>) :
                                    (staffUser?.role == 'ROLE_COLLECTIONS_AGENT') ? (<>💳 Collections Agent Operations Hub</>) :
                                    (staffUser?.role == 'ROLE_COLLECTIONS_MANAGER') ? (<>📊 Collections Management & Risk Portfolio</>) :
                                    (<>🛡️ Central Staff Administration Portal</>)
                                }
                            </h1>
                            <div className="staff-banner-sub">
                                <span>Staff Member: <strong>{staffUser?.name}</strong></span>
                                <span className="role-pill">{staffUser?.role}</span>
                                {(Boolean(officerBranch)) && (<>
                                    <span style={{ background: '#EDF2F7', color: '#2D3748', padding: '3px 10px', borderRadius: '12px', fontWeight: '600', fontSize: '12px' }}>
                                        🏢 Branch: <strong>{officerBranch}</strong>
                                    </span>
                                </>)}
                            </div>
                        </div>
        
                        
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {(staffUser?.role == 'ROLE_LOAN_OFFICER' || staffUser?.role == 'ROLE_ADMIN') && (<>
                                <a href="/loan-approval.xhtml" className="btn" style={{ width: 'auto', padding: '10px 18px', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ED7D16', color: '#FFFFFF' }}>
                                    <span>⚡  Loan Approval Workflow</span>
                                </a>
                            </>)}
                            <a href="/loan-search" className="btn btn-secondary" style={{ width: 'auto', padding: '10px 18px', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <span>🔍 Loan & Customer Search</span>
                            </a>
                        </div>
                    </div>
        
                    
                    {
        
                        
                        (staffUser?.role == 'ROLE_LOAN_OFFICER') ? (<>
                            <div className="metrics-grid">
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Active Loans</span>
                                        <span style={{ color: '#059669' }}>📈</span>
                                    </div>
                                    <div className="metric-value">{activeLoansCount}</div>
                                    <div className="metric-hint">Currently servicing in branch</div>
                                </div>
        
                                <div className="metric-card" style={{ borderTop: '3px solid #ED7D16' }}>
                                    <div className="metric-label">
                                        <span>Pending Applications</span>
                                        <span style={{ color: '#ED7D16' }}>📝</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#ED7D16' }}>{pendingLoansCount}</div>
                                    <div className="metric-hint">Require officer review & approval</div>
                                </div>
        
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Disbursed Volume</span>
                                        <span style={{ color: '#24446B' }}>🏛️</span>
                                    </div>
                                    <div className="metric-value">₹{totalPrincipal}</div>
                                    <div className="metric-hint">Cumulative sanctioned principal</div>
                                </div>
        
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Branch Outstanding</span>
                                        <span style={{ color: '#DC2626' }}>💼</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#DC2626' }}>₹{totalRemaining}</div>
                                    <div className="metric-hint">Total principal receivable</div>
                                </div>
                            </div>
                        </>) :
        
                        
                        (staffUser?.role == 'ROLE_COLLECTIONS_AGENT') ? (<>
                            <div className="metrics-grid">
                                <div className="metric-card" style={{ borderTop: '3px solid #DC2626' }}>
                                    <div className="metric-label">
                                        <span>Overdue Accounts</span>
                                        <span style={{ color: '#DC2626' }}>⚠️</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#DC2626' }}>{overdueLoansCount}</div>
                                    <div className="metric-hint">Accounts requiring collection action</div>
                                </div>
        
                                <div className="metric-card" style={{ borderTop: '3px solid #B91C1C' }}>
                                    <div className="metric-label">
                                        <span>Delinquent Amount</span>
                                        <span style={{ color: '#B91C1C' }}>💸</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#B91C1C' }}>₹{totalOverdueAmount}</div>
                                    <div className="metric-hint">Total overdue EMI balance</div>
                                </div>
        
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Critical DPD (&gt;30 Days)</span>
                                        <span style={{ color: '#F59E0B' }}>🚨</span>
                                    </div>
                                    <div className="metric-value">{dpdSma1Count + dpdSma2Count + dpdNpaCount}</div>
                                    <div className="metric-hint">Accounts at risk of NPA</div>
                                </div>
        
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Total Branch Accounts</span>
                                        <span style={{ color: '#24446B' }}>🏢</span>
                                    </div>
                                    <div className="metric-value">{totalLoansCount}</div>
                                    <div className="metric-hint">Assigned branch portfolio</div>
                                </div>
                            </div>
                        </>) :
        
                        
                        (staffUser?.role == 'ROLE_COLLECTIONS_MANAGER') ? (<>
                            <div className="metrics-grid">
                                <div className="metric-card" style={{ borderTop: '3px solid #DC2626' }}>
                                    <div className="metric-label">
                                        <span>Portfolio At Risk (PAR)</span>
                                        <span style={{ color: '#DC2626' }}>📊</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#DC2626' }}>{parRate}%</div>
                                    <div className="metric-hint">Overdue vs Total Outstanding</div>
                                </div>
        
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Total Delinquent Amount</span>
                                        <span style={{ color: '#B91C1C' }}>💸</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#B91C1C' }}>₹{totalOverdueAmount}</div>
                                    <div className="metric-hint">{overdueLoansCount} delinquent borrower accounts</div>
                                </div>
        
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Total Active Portfolio</span>
                                        <span style={{ color: '#059669' }}>💼</span>
                                    </div>
                                    <div className="metric-value">₹{totalRemaining}</div>
                                    <div className="metric-hint">{activeLoansCount} servicing loans</div>
                                </div>
        
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Total Accounts</span>
                                        <span style={{ color: '#24446B' }}>🏛️</span>
                                    </div>
                                    <div className="metric-value">{totalLoansCount}</div>
                                    <div className="metric-hint">Total branch accounts monitored</div>
                                </div>
                            </div>
        
                            
                            <div className="dpd-grid">
                                <div className="dpd-card current">
                                    <div className="dpd-title">Standard (0 DPD)</div>
                                    <div className="dpd-count">{dpdCurrentCount}</div>
                                    <div className="dpd-amt">₹{dpdCurrentAmount}</div>
                                </div>
                                <div className="dpd-card sma0">
                                    <div className="dpd-title">SMA-0 (1-30 DPD)</div>
                                    <div className="dpd-count">{dpdSma0Count}</div>
                                    <div className="dpd-amt">₹{dpdSma0Amount}</div>
                                </div>
                                <div className="dpd-card sma1">
                                    <div className="dpd-title">SMA-1 (31-60 DPD)</div>
                                    <div className="dpd-count">{dpdSma1Count}</div>
                                    <div className="dpd-amt">₹{dpdSma1Amount}</div>
                                </div>
                                <div className="dpd-card sma2">
                                    <div className="dpd-title">SMA-2 (61-90 DPD)</div>
                                    <div className="dpd-count">{dpdSma2Count}</div>
                                    <div className="dpd-amt">₹{dpdSma2Amount}</div>
                                </div>
                                <div className="dpd-card npa">
                                    <div className="dpd-title" style={{ color: '#991B1B' }}>NPA (90+ DPD)</div>
                                    <div className="dpd-count" style={{ color: '#991B1B' }}>{dpdNpaCount}</div>
                                    <div className="dpd-amt" style={{ color: '#991B1B' }}>₹{dpdNpaAmount}</div>
                                </div>
                            </div>
                        </>) :
        
                        
                        (<>
                            <div className="metrics-grid">
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Total Loans</span>
                                        <span style={{ color: '#24446B' }}>🏛️</span>
                                    </div>
                                    <div className="metric-value">{totalLoansCount}</div>
                                    <div className="metric-hint">Across authorized branches</div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Active Borrowers</span>
                                        <span style={{ color: '#059669' }}>👥</span>
                                    </div>
                                    <div className="metric-value">{activeLoansCount}</div>
                                    <div className="metric-hint">Servicing loans</div>
                                </div>
                                <div className="metric-card" style={{ borderTop: '3px solid #ED7D16' }}>
                                    <div className="metric-label">
                                        <span>Pending Applications</span>
                                        <span style={{ color: '#ED7D16' }}>📝</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#ED7D16' }}>{pendingLoansCount}</div>
                                    <div className="metric-hint">Awaiting officer sanction</div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-label">
                                        <span>Total Outstanding</span>
                                        <span style={{ color: '#DC2626' }}>💼</span>
                                    </div>
                                    <div className="metric-value" style={{ color: '#DC2626' }}>₹{totalRemaining}</div>
                                    <div className="metric-hint">Total portfolio receivable</div>
                                </div>
                            </div>
                        </>)
        
                    }
        
                    
        
                    
                    {(staffUser?.role == 'ROLE_LOAN_OFFICER' || staffUser?.role == 'ROLE_ADMIN') && (<>
                        <div className="staff-panel">
                            <div className="staff-panel-header">
                                <h2 className="staff-panel-title">
                                    <span>📝 Pending Loan Applications for Review</span>
                                    <span className="status-badge status-pending">{pendingLoansCount} Pending</span>
                                </h2>
                            </div>
        
                            <div className="table-responsive">
                                <div className="modern-table-wrapper"><table>
                                    <thead>
                                        <tr>
                                            <th>Application / Account</th>
                                            <th>Borrower Name</th>
                                            <th>Customer ID</th>
                                            <th>Sanction Amount</th>
                                            <th>Interest & Tenure</th>
                                            <th>Est. Monthly EMI</th>
                                            <th>Branch</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'center' }}>Decision Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingLoans && pendingLoans.map((pl: any, index: number) => (<>
                                            <tr>
                                                <td>
                                                    <strong style={{ color: '#2B6CB0', fontFamily: 'monospace', fontSize: '14px' }}>
                                                        {pl.accountNumber}
                                                    </strong>
                                                </td>
                                                <td><strong>{pl.user.name}</strong></td>
                                                <td><span style={{ fontFamily: 'monospace', color: '#475569' }}>{pl.customerId}</span></td>
                                                <td><strong>₹{pl.amount}</strong></td>
                                                <td>{pl.interest}% &bull; {pl.months} mos</td>
                                                <td style={{ color: '#2B6CB0', fontWeight: '600' }}>₹{pl.emi}</td>
                                                <td>
                                                    <span style={{ background: '#EDF2F7', color: '#475569', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>
                                                        {pl.branch}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="status-badge status-pending">{pl.status}</span>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="action-btn-group">
                                                        
                                                        <a href={`/loan-details?loanId=${pl.loanId}`} className="btn-profile" title="Open 360° Comprehensive Profile">
                                                            Profile
                                                        </a>
        
                                                        
                                                        <form onSubmit={handleSubmit} action="/staff/loans/approve" method="post" style={{ display: 'inline', margin: '0' }}>
                                                            <input type="hidden" name={_csrf?.parameterName} value={_csrf?.token} />
                                                            <input type="hidden" name="loanId" value={pl.loanId} />
                                                            <button type="submit" className="btn-approve" onClick={(e: any) => { if (!(confirm('Approve and sanction loan account pl?.accountNumber?'))) e.preventDefault(); }}>
                                                                Approve
                                                            </button>
                                                        </form>
        
                                                        
                                                        <button type="button" className="btn-reject" onClick={() => openRejectModal(pl?.loanId, pl?.accountNumber, pl?.user?.name)}>
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>))}
                                        {(!pendingLoans) && (<>
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: 'center', padding: '35px 20px', color: '#64748B' }}>
                                                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                                                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>No Pending Loan Applications</div>
                                                    <div style={{ fontSize: '13px', color: '#94A3B8' }}>All applications submitted to your authorized branch have been reviewed.</div>
                                                </td>
                                            </tr>
                                        </>)}
                                    </tbody>
                                </table></div>
                            </div>
                        </div>
                    </>)}
        
                    
                    {(staffUser?.role == 'ROLE_COLLECTIONS_AGENT' || staffUser?.role == 'ROLE_COLLECTIONS_MANAGER' || staffUser?.role == 'ROLE_ADMIN') && (<>
                        <div className="staff-panel">
                            <div className="staff-panel-header">
                                <h2 className="staff-panel-title">
                                    <span>⚠️ Delinquent & Overdue Loan Accounts</span>
                                    <span className="status-badge status-overdue">{overdueLoansCount} Overdue</span>
                                </h2>
                            </div>
        
                            <div className="table-responsive">
                                <div className="modern-table-wrapper"><table>
                                    <thead>
                                        <tr>
                                            <th>Account No</th>
                                            <th>Borrower Name</th>
                                            <th>Mobile (Masked)</th>
                                            <th>Principal Sanctioned</th>
                                            <th>Outstanding Balance</th>
                                            <th>Overdue Amount</th>
                                            <th>DPD Bucket</th>
                                            <th>Branch</th>
                                            <th style={{ textAlign: 'center' }}>Collection Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {delinquentLoans && delinquentLoans.map((dl: any, index: number) => (<>
                                            <tr>
                                                <td>
                                                    <strong style={{ color: '#2B6CB0', fontFamily: 'monospace', fontSize: '14px' }}>
                                                        {dl.accountNumber}
                                                    </strong>
                                                </td>
                                                <td><strong>{dl.user.name}</strong></td>
                                                <td>{dl.maskedPhone}</td>
                                                <td>₹{dl.amount}</td>
                                                <td>
                                                    <strong style={{ color: '#DC2626' }}>₹{dl.remaining}</strong>
                                                </td>
                                                <td>
                                                    <strong style={{ color: '#991B1B', background: '#FEE2E2', padding: '3px 8px', borderRadius: '6px' }}>
                                                        ₹{dl.overdueAmount > 0 ? dl.overdueAmount : dl.emi}
                                                    </strong>
                                                </td>
                                                <td>
                                                    {
                                                        (dl.dpd > 90) ? (<>
                                                            <span className="dpd-pill dpd-pill-high">{dl.dpd} DPD (NPA)</span>
                                                        </>) :
                                                        (dl.dpd > 30) ? (<>
                                                            <span className="dpd-pill dpd-pill-high">{dl.dpd} DPD</span>
                                                        </>) :
                                                        (dl.dpd > 0) ? (<>
                                                            <span className="dpd-pill dpd-pill-low">{dl.dpd} DPD</span>
                                                        </>) :
                                                        (<>
                                                            <span className="dpd-pill dpd-pill-zero">Current</span>
                                                        </>)
                                                    }
                                                </td>
                                                <td>
                                                    <span style={{ background: '#EDF2F7', color: '#475569', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>
                                                        {dl.branch}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div className="action-btn-group">
                                                        
                                                        <a href={`/loan-details?loanId=${dl.loanId}`} className="btn-profile" title="Open 360° Comprehensive Profile">
                                                            Profile
                                                        </a>
        
                                                        
                                                        <button type="button" className="btn-collect" onClick={() => openCollectionModal(dl?.loanId, dl?.accountNumber, dl?.user?.name, dl?.remaining, dl?.overdueAmount > 0 ? dl?.overdueAmount : dl?.emi)}>
                                                            Record Collection
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>))}
                                        {(!delinquentLoans) && (<>
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: 'center', padding: '35px 20px', color: '#64748B' }}>
                                                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
                                                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>Zero Delinquency</div>
                                                    <div style={{ fontSize: '13px', color: '#94A3B8' }}>All loan accounts in your authorized branch are currently up-to-date.</div>
                                                </td>
                                            </tr>
                                        </>)}
                                    </tbody>
                                </table></div>
                            </div>
                        </div>
                    </>)}
        
                    
                    {((staffUser?.role == 'ROLE_COLLECTIONS_AGENT' || staffUser?.role == 'ROLE_COLLECTIONS_MANAGER' || staffUser?.role == 'ROLE_ADMIN') && Boolean(recentCollections)) && (<>
                        <div className="staff-panel">
                            <div className="staff-panel-header">
                                <h2 className="staff-panel-title">
                                    <span>💳 Recent Branch Collections Activity</span>
                                </h2>
                            </div>
        
                            <div className="table-responsive">
                                <div className="modern-table-wrapper"><table>
                                    <thead>
                                        <tr>
                                            <th>Transaction Ref</th>
                                            <th>Loan Account</th>
                                            <th>Payment Mode</th>
                                            <th>Amount Collected</th>
                                            <th>Date & Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentCollections && recentCollections.map((rc: any, index: number) => (<>
                                            <tr>
                                                <td><span style={{ fontFamily: 'monospace', color: '#2B6CB0', fontWeight: '600' }}>{rc.transactionReference}</span></td>
                                                <td>
                                                    {
                                                        (Boolean(rc.loan)) ? (<>
                                                            <a href={`/loan-details?loanId=${rc.loan.loanId}`} style={{ textDecoration: 'none', fontFamily: 'monospace', fontWeight: '700', color: '#24446B' }}>
                                                                {rc.loan.accountNumber}
                                                            </a>
                                                        </>) :
                                                        (<>
                                                            <span style={{ color: '#94A3B8' }}>-</span>
                                                        </>)
                                                    }
                                                </td>
                                                <td>
                                                    <span style={{ background: '#EDF2F7', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                                                        {rc.paymentMode}
                                                    </span>
                                                </td>
                                                <td><strong style={{ color: '#15803D' }}>₹{rc.amount}</strong></td>
                                                <td>{rc.paymentDate}</td>
                                                <td><span className="status-badge status-active">{rc.status}</span></td>
                                            </tr>
                                        </>))}
                                    </tbody>
                                </table></div>
                            </div>
                        </div>
                    </>)}
        
                    
                    <div className="staff-panel">
                        <div className="staff-panel-header">
                            <h2 className="staff-panel-title">
                                <span>🏛️ Authorized Branch Loan Portfolio</span>
                                <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#64748B' }}>({totalLoansCount} accounts)</span>
                            </h2>
                        </div>
        
                        <div className="table-responsive">
                            <div className="modern-table-wrapper"><table>
                                <thead>
                                    <tr>
                                        <th>Account No</th>
                                        <th>Borrower Name</th>
                                        <th>Sanctioned (₹)</th>
                                        <th>Interest & Tenure</th>
                                        <th>Monthly EMI</th>
                                        <th>Outstanding Balance</th>
                                        <th>Repayment Status</th>
                                        <th>DPD</th>
                                        <th>Loan Status</th>
                                        <th style={{ textAlign: 'center' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loans && loans.map((l: any, index: number) => (<>
                                        <tr>
                                            <td>
                                                <strong style={{ color: '#2B6CB0', fontFamily: 'monospace', fontSize: '14px' }}>
                                                    {l.accountNumber}
                                                </strong>
                                            </td>
                                            <td><strong>{l.user.name}</strong></td>
                                            <td>₹{l.amount}</td>
                                            <td>{l.interest}% &bull; {l.months} mos</td>
                                            <td style={{ color: '#2B6CB0', fontWeight: '600' }}>₹{l.emi}</td>
                                            <td>
                                                <strong style="color:{l.remaining > 0 ? '#DC2626' : '#15803D'};">
                                                    ₹{l.remaining}
                                                </strong>
                                            </td>
                                            <td>
                                                {
                                                    (l.repaymentStatus == 'OVERDUE') ? (<>
                                                        <span className="status-badge status-overdue">⚠️ Overdue</span>
                                                    </>) :
                                                    (l.repaymentStatus == 'CURRENT') ? (<>
                                                        <span className="status-badge status-active">Current</span>
                                                    </>) :
                                                    (l.repaymentStatus == 'CLOSED') ? (<>
                                                        <span className="status-badge status-closed">Closed</span>
                                                    </>) :
                                                    (<>
                                                        <span className="status-badge status-pending">{l.repaymentStatus}</span>
                                                    </>)
                                                }
                                            </td>
                                            <td>
                                                {
                                                    (l.dpd > 0) ? (<>
                                                        <span className="dpd-pill dpd-pill-high">{l.dpd} DPD</span>
                                                    </>) :
                                                    (l.status == 'CLOSED') ? (<>
                                                        <span style={{ color: '#94A3B8', fontSize: '12px' }}>-</span>
                                                    </>) :
                                                    (<>
                                                        <span className="dpd-pill dpd-pill-zero">0 DPD</span>
                                                    </>)
                                                }
                                            </td>
                                            <td>
                                                {
                                                    (l.status == 'ACTIVE') ? (<>
                                                        <span className="status-badge status-active">Active</span>
                                                    </>) :
                                                    (l.status == 'CLOSED') ? (<>
                                                        <span className="status-badge status-closed">Closed</span>
                                                    </>) :
                                                    (l.status == 'REJECTED') ? (<>
                                                        <span className="status-badge status-rejected">Rejected</span>
                                                    </>) :
                                                    (<>
                                                        <span className="status-badge status-pending">{l.status}</span>
                                                    </>)
                                                }
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                
                                                <a href={`/loan-details?loanId=${l.loanId}`} className="btn-profile" title="Open 360° Comprehensive Profile">
                                                    Profile
                                                </a>
                                            </td>
                                        </tr>
                                    </>))}
                                    {(!loans) && (<>
                                        <tr>
                                            <td colSpan="10" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
                                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
                                                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>No Loan Records Found</div>
                                                <div style={{ fontSize: '13px', color: '#94A3B8' }}>There are currently no loan records assigned to your branch.</div>
                                            </td>
                                        </tr>
                                    </>)}
                                </tbody>
                            </table></div>
                        </div>
                    </div>
        
                </div>
        
                
                <div id="rejectModal" className="staff-modal-backdrop">
                    <div className="staff-modal-card">
                        <h3 style={{ marginTop: '0', color: '#24446B' }}>Reject Loan Application</h3>
                        <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '16px' }}>
                            Account: <strong id="rejectModalAccount"></strong> &bull; Borrower: <strong id="rejectModalBorrower"></strong>
                        </p>
                        <form onSubmit={handleSubmit} action="/staff/loans/reject" method="post">
                            <input type="hidden" name={_csrf?.parameterName} value={_csrf?.token} />
                            <input type="hidden" name="loanId" id="rejectModalLoanId" />
        
                            <label style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Rejection Reason <span style={{ color: '#DC2626' }}>*</span></label>
                            <select onChange={handleInputChange} name="reason" style={{ marginTop: '6px', marginBottom: '16px' }} required>
                                <option value="Credit score does not meet minimum bank threshold">Credit score does not meet minimum bank threshold</option>
                                <option value="Debt-to-income ratio exceeds permissible limits">Debt-to-income ratio exceeds permissible limits</option>
                                <option value="Incomplete or unverified borrower KYC documentation">Incomplete or unverified borrower KYC documentation</option>
                                <option value="Customer employment / income verification unconfirmed">Customer employment / income verification unconfirmed</option>
                                <option value="Application does not meet eligibility criteria">Other bank policy criteria not met</option>
                            </select>
        
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-secondary" style={{ width: 'auto', padding: '8px 16px', fontSize: '13px' }} onClick={() => closeRejectModal()}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-danger" style={{ width: 'auto', padding: '8px 16px', fontSize: '13px' }}>
                                    Confirm Rejection
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        
                
                <div id="collectionModal" className="staff-modal-backdrop">
                    <div className="staff-modal-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <h3 style={{ margin: '0', color: '#24446B' }}>Record Collection Payment</h3>
                            <button type="button" onClick={() => closeCollectionModal()} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' }}>&times;</button>
                        </div>
                        <p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 16px 0' }}>
                            Account: <strong id="collectModalAccount" style={{ color: '#2B6CB0' }}></strong> &bull; 
                            Borrower: <strong id="collectModalBorrower"></strong>
                        </p>
        
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Outstanding Balance</div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#DC2626' }} id="collectModalBalance">₹0.00</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Overdue EMI Due</div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#991B1B' }} id="collectModalOverdue">₹0.00</div>
                            </div>
                        </div>
        
                        <form onSubmit={handleSubmit} action="/staff/collections/record" method="post">
                            <input type="hidden" name={_csrf?.parameterName} value={_csrf?.token} />
                            <input type="hidden" name="loanId" id="collectModalLoanId" />
        
                            <label style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Collection Amount (₹) <span style={{ color: '#DC2626' }}>*</span></label>
                            <input onChange={handleInputChange} type="number" step="any" min="1" name="amount" id="collectModalAmount" required style={{ marginTop: '6px', marginBottom: '12px' }} />
        
                            <label style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Payment Mode <span style={{ color: '#DC2626' }}>*</span></label>
                            <select onChange={handleInputChange} name="paymentMode" style={{ marginTop: '6px', marginBottom: '12px' }} required>
                                <option value="CASH">CASH (Physical Receipt Issued)</option>
                                <option value="UPI">UPI (QR / VPA Transfer)</option>
                                <option value="NEFT">NEFT / RTGS</option>
                                <option value="CHEQUE">Bank Cheque</option>
                                <option value="DD">Demand Draft</option>
                            </select>
        
                            <label style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Receipt / Transaction Reference</label>
                            <input onChange={handleInputChange} type="text" name="transactionReference" id="collectModalRef" placeholder="e.g. REC-2026-90812 or Bank Ref" maxLength="50" style={{ marginTop: '6px', marginBottom: '18px' }} />
        
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-secondary" style={{ width: 'auto', padding: '8px 16px', fontSize: '13px' }} onClick={() => closeCollectionModal()}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn" style={{ width: 'auto', padding: '8px 20px', fontSize: '13px', backgroundColor: '#ED7D16' }}>
                                    Confirm & Record Collection
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        
                
            </>) :
        
            
            (<>
                <div className="customer-dashboard">
        
                    
                    <div className="welcome-banner">
                        <div>
                            <h1 className="welcome-title">Welcome back, {userObj?.name}!</h1>
                            <p className="welcome-sub">Here's an overview of your loan account.</p>
                        </div>
                        <div>
                            <a href="/applyLoan" className="btn-orange-primary">
                                <span style={{ fontSize: '16px', fontWeight: '800' }}>+</span> Apply for Loan
                            </a>
                        </div>
                    </div>
        
                    
                    {(Boolean(successMessage) || param?.applied) && (<>
                        <div className="alert alert-success" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid #059669', background: '#ECFDF5', color: '#065F46', padding: '16px 20px', borderRadius: '8px' }}>
                            <span style={{ fontSize: '20px' }}>✅</span>
                            <div>
                                <strong>Application Status:</strong> {Boolean(successMessage) ? successMessage : 'Your loan application has been submitted successfully && is currently under review by our loan officers.'}
                            </div>
                        </div>
                    </>)}
                    {(Boolean(errorMessage)) && (<>
                        <div className="alert alert-danger" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid #DC2626', background: '#FEF2F2', color: '#991B1B', padding: '16px 20px', borderRadius: '8px' }}>
                            <span style={{ fontSize: '20px' }}>⚠️</span>
                            <div>
                                {errorMessage}
                            </div>
                        </div>
                    </>)}
        
                    
                    {(param?.selectLoan) && (<>
                        <div className="alert alert-info" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid #315B91' }}>
                            <span style={{ fontSize: '20px' }}>ℹ️</span>
                            <div>
                                <strong>Select Loan for Repayment:</strong> You have multiple active loan accounts?.Please click the <strong>"Pay EMI"</strong> button next to the specific loan you wish to repay below?.</div>
                        </div>
                    </>)}
        
                    
                    <div className="summary-grid">
                        
                        <div className="summary-card">
                            <div className="card-top">
                                <span className="card-label">Total Loans</span>
                                <div className="card-icon-wrap" style={{ background: '#F0F4F8', color: '#24446B' }}>📋</div>
                            </div>
                            <div className="card-value">
                                {totalLoanCount != null ? totalLoanCount : 0}
                            </div>
                            <div className="card-desc">All loan accounts on record</div>
                        </div>
        
                        
                        <div className="summary-card">
                            <div className="card-top">
                                <span className="card-label">Active Loans</span>
                                <div className="card-icon-wrap" style={{ background: '#E6F7F3', color: '#0F9B79' }}>🟢</div>
                            </div>
                            <div className="card-value">
                                {activeLoanCount != null ? activeLoanCount : 0}
                            </div>
                            <div className="card-desc">Currently servicing</div>
                        </div>
        
                        
                        <div className="summary-card">
                            <div className="card-top">
                                <span className="card-label">Pending Applications</span>
                                <div className="card-icon-wrap" style={{ background: '#FEF3EB', color: '#ED7D16' }}>⏳</div>
                            </div>
                            <div className="card-value">
                                {pendingLoanCount != null ? pendingLoanCount : 0}
                            </div>
                            <div className="card-desc">Awaiting sanction / review</div>
                        </div>
        
                        
                        <div className="summary-card" style={{ borderLeft: '3px solid #ED7D16' }}>
                            <div className="card-top">
                                <span className="card-label">Outstanding Balance</span>
                                <div className="card-icon-wrap" style={{ background: '#FEF3EB', color: '#ED7D16' }}>💳</div>
                            </div>
                            <div className="card-value" style={{ color: '#ED7D16' }}>
                                ₹{outstandingBalance != null ? outstandingBalance : (totalRemaining != null ? totalRemaining : 0.0)}
                            </div>
                            <div className="card-desc">Total remaining principal</div>
                        </div>
                    </div>
        
                    
                    {
                        (Boolean(loans) && activeLoanCount > 0) ? (<>
                            <div className="dashboard-section-card">
                                <div className="section-header">
                                    <div>
                                        <h2 className="section-title">Your Loan Portfolio</h2>
                                        <p className="section-subtitle">Real-time balances and EMI installment commitments</p>
                                    </div>
                                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>
                                        Showing {loans?.size?.()} accounts
                                    </span>
                                </div>
        
                                <div className="table-responsive" style={{ marginTop: '0', border: 'none' }}>
                                    <div className="modern-table-wrapper"><table>
                                        <thead>
                                            <tr>
                                                <th>Loan Account</th>
                                                <th>Product Type</th>
                                                <th>Sanctioned Amount</th>
                                                <th>Interest Rate</th>
                                                <th>Tenure</th>
                                                <th>Monthly EMI</th>
                                                <th>Outstanding Balance</th>
                                                <th>Status</th>
                                                <th style={{ textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loans && loans.map((l: any, index: number) => (<>
                                                <tr>
                                                    <td>
                                                        <strong style={{ color: '#24446B', fontFamily: 'monospace', fontSize: '14px' }}>
                                                            {
                                                                (Boolean(l.accountNumber)) ? (<>
                                                                     {l.accountNumber}
                                                                </>) :
                                                                (<>
                                                                     {l.loanId}
                                                                </>)
                                                            }
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        {Boolean(l.productType) ? l.productType : 'Personal Loan'}
                                                    </td>
                                                    <td>₹{l.amount}</td>
                                                    <td>{l.interest}% ({Boolean(l.interestType) ? l.interestType : 'FIXED'})</td>
                                                    <td>{l.months} mos</td>
                                                    <td style={{ color: '#315B91', fontWeight: '600' }}>
                                                        ₹{l.emi}
                                                    </td>
                                                    <td>
                                                        <strong style="color:{l.remaining > 0 ? '#ED7D16' : '#0F9B79'};">
                                                            ₹{l.remaining}
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        {
                                                            (l.status == 'ACTIVE' || l.status == 'APPROVED') ? (<>
                                                                <span className="badge-pill badge-success">ACTIVE</span>
                                                            </>) :
                                                            (l.status == 'CLOSED') ? (<>
                                                                <span className="badge-pill badge-secondary">CLOSED</span>
                                                            </>) :
                                                            (l.status == 'REJECTED') ? (<>
                                                                <span className="badge-pill badge-danger">REJECTED</span>
                                                            </>) :
                                                            (<>
                                                                <span className="badge-pill badge-warning">{l.status}</span>
                                                            </>)
                                                        }
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        {
                                                            (l.status == 'PENDING' || l.status == 'SUBMITTED' || l.status == 'IN_REVIEW' || l.status == 'APPLIED') ? (<>
                                                                <span style={{ color: '#D97706', fontSize: '12px', fontWeight: '600', display: 'inline-block', padding: '4px 10px', background: '#FEF3C7', borderRadius: '6px' }}>⏳ Under Review</span>
                                                            </>) :
                                                            (l.status == 'REJECTED') ? (<>
                                                                <span style={{ color: '#DC2626', fontSize: '12px', fontWeight: '600', display: 'inline-block', padding: '4px 10px', background: '#FEE2E2', borderRadius: '6px' }}>❌ Rejected</span>
                                                            </>) :
                                                            (l.remaining > 0) ? (<>
                                                                <a href={`/payPage?loanId=${l.loanId}`} className="btn" style={{ padding: '7px 16px', fontSize: '13px', width: 'auto', textDecoration: 'none', display: 'inline-block', background: '#24446B', color: '#FFFFFF', borderRadius: '6px', fontWeight: '600' }}>
                                                                    Pay EMI
                                                                </a>
                                                            </>) :
                                                            (<>
                                                                <span style={{ color: '#0F9B79', fontSize: '13px', fontWeight: '700' }}>Fully Paid</span>
                                                            </>)
                                                        }
                                                    </td>
                                                </tr>
                                            </>))}
                                        </tbody>
                                    </table></div>
                                </div>
                            </div>
                        </>) :
                        (<>
                            
                            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '48px 32px', textAlign: 'center', maxWidth: '560px', margin: '20px auto 32px auto', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: '52px', marginBottom: '16px' }}>🏦</div>
                                <h3 style={{ color: '#172B4D', fontSize: '22px', fontWeight: '700', margin: '0 0 10px 0' }}>No Active Loans</h3>
                                <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                                    You don't have any active loans yet. Start a new application to get started.
                                </p>
                                <a href="/applyLoan" className="btn-orange-primary" style={{ margin: '0 auto' }}>
                                    Apply for a Loan
                                </a>
                            </div>
                        </>)
                    }
        
                    
                    <div className="dashboard-section-card activity-section">
                        <div className="section-header">
                            <div>
                                <h2 className="section-title">Recent Activity</h2>
                                <p className="section-subtitle">Your latest loan applications, approvals, and repayment records</p>
                            </div>
                        </div>
        
                        {
                            (Boolean(recentActivities)) ? (<>
                                <div className="activity-list">
                                    {recentActivities && recentActivities.map((act: any, index: number) => (<>
                                        <div className="activity-row">
                                            <div className="activity-left">
                                                <div className="activity-icon">
                                                    {act.icon}
                                                </div>
                                                <div>
                                                    <h4 className="activity-title">{act.title}</h4>
                                                    <p className="activity-desc">{act.description}</p>
                                                </div>
                                            </div>
                                            <div className="activity-right">
                                                <span className={`badge-pill ${act.badgeClass}`}>
                                                    {act.status}
                                                </span>
                                                <div className="activity-date">{act.formattedDate}</div>
                                            </div>
                                        </div>
                                    </>))}
                                </div>
                            </>) :
                            (<>
                                <div style={{ textAlign: 'center', padding: '36px 20px', color: '#64748B' }}>
                                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏱️</div>
                                    <p style={{ margin: '0', fontSize: '14px', fontWeight: '500' }}>
                                        Your recent applications and repayments will appear here.
                                    </p>
                                </div>
                            </>)
                        }
                    </div>
        
                </div>
            </>)
        }
        
        </div>
        </>
    );
};

export default DashboardComponent;