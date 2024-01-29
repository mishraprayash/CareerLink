
const { DOMAIN } = process.env;
export const fetchAllInternships = async () => {
    try {
        const response = await fetch(`${DOMAIN}/api/common/explore`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllCompanies = async () => {
    try {
        const response = await fetch(`${DOMAIN}/api/common/companies`)
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}
export const fetchPendingAdmins = async () => {
    try {
        const response = await fetch(`${DOMAIN}/api/admin/pendingadmins`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchPendingInternships = async () => {
    try {
        const response = await fetch(`${DOMAIN}/api/admin/pendinginternships`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}
export const fetchPendingCompanies = async () => {
    try {
        const response = await fetch(`${DOMAIN}/api/admin/pendingcompanies`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}