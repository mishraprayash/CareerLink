

const loggedOutOnlyClientRoutes = ['/loginCompany', '/signupCompany', '/admin/login', '/admin/register'];

const adminLoggedInClientRoutes = [
    '/admin/dashboard',
    '/admin/dashboard/components/overview',
    '/admin/dashboard/components/pendingcompany',
    '/admin/dashboard/components/pendingadmin',
    '/admin/dashboard/components/pendinginternship',
    '/admin/dashboard/components/profile',
    '/admin/dashboard/components/settings',
]

const adminLoggedOutClientRoutes = [
    '/admin/login',
    '/admin/register'
]

const adminLoggedInAPIRoutes = [
    '/api/admin/new/accept',
    '/api/admin/new/reject',
    '/api/admin/pendingadmins',
    '/api/admin/pendingcompanies',
    '/api/admin/pendinginternships',
    '/api/admin/changepassword',
    '/api/admin/sendverificationlink',
];

const adminLoggedOutAPIRoutes = [
    '/api/admin/forgotpassword',
    '/api/admin/login',
    '/api/admin/register',
    '/api/admin/resetpassword',
    '/api/admin/verifyemail',
];

const companyLoggedInAPIRoutes = [
    '/api/company/createinternships',  // email verification needed for this
    '/api/company/runninginternships',
    '/api/company/pendinginternships',
    '/api/company/sendverificationlink',
    '/api/company/updateprofile',
    '/api/company/changepassword',
    // email verification needed for this
];

const companyLoggedOutAPIRoutes = [
    '/api/company/forgotpassword',
    '/api/company/login',
    '/api/company/register',
    '/api/company/resetpassword',
    '/api/company/verifyemail'
];


const companyLoggedInClientRoutes = [
    '/dashboard',
    '/dashboard/company/createinternship',
    '/dashboard/company/internship',
    '/dashboard/company/updateprofile',
    '/'

]
// remaining for handling student route
const studentLoggedInAPIRoutes = [
    '/api/student/',
    '/api/student/appliedInternships',
    'api/student/profile',
    'api/student/updateprofile',
    'api/student/applyinternship'
];


export {
    loggedOutOnlyClientRoutes,
    adminLoggedInAPIRoutes,
    adminLoggedInClientRoutes,
    adminLoggedOutAPIRoutes,
    adminLoggedOutClientRoutes,
    companyLoggedInAPIRoutes,
    companyLoggedInClientRoutes,
    companyLoggedOutAPIRoutes,
    studentLoggedInAPIRoutes,
}