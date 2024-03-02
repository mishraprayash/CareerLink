import React, { useState } from 'react';

const FilterOptions = ({ applyFilters }) => {
    const [filterOptions, setFilterOptions] = useState({
        position: '',
        companyName: '',
        location: '',
        isRemote: '',
        paid: '',
        noofVacancy: null,
        workTime: '',
        minSalary: '',
        maxSalary: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions({ ...filterOptions, [name]: value });
    };

    const handleApplyFilters = () => {
        applyFilters(filterOptions);
    };

    return (
        <div className="fixed left-0 top-24 bg-white p-4 shadow-md z-50">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center my-4">
                    <label htmlFor="position" className="block mb-1">Position</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        placeholder="Position"
                        value={filterOptions.position}
                        onChange={handleInputChange}
                        className="border rounded-md p-2"
                    />
                </div>
                <div className="flex items-center my-4">
                    <label htmlFor="companyName" className="block mb-1">Company</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        placeholder="Company"
                        value={filterOptions.companyName}
                        onChange={handleInputChange}
                        className="border rounded-md p-2"
                    />
                </div>
                <div className="flex items-center my-4">
                    <label htmlFor="location" className="block mb-1">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Location"
                        value={filterOptions.location}
                        onChange={handleInputChange}
                        className="border rounded-md p-2"
                    />
                </div>
                <div className=" items-center my-4">
                    <label htmlFor="noofVacancy" className="block mb-1">Number of Vacancies</label>
                    <input
                        type="number"
                        id="noofVacancy"
                        name="noofVacancy"
                        placeholder="Number of Vacancies"
                        value={filterOptions.noofVacancy}
                        onChange={handleInputChange}
                        className="border rounded-md p-2"
                    />
                </div>
                <div className="flex items-center my-4">
                    <label htmlFor="remote" className="block mb-1">Remote</label>
                    <select id="remote" name="remote" value={filterOptions.remote} onChange={handleInputChange} className="border rounded-md p-2">
                        <option value="">Remote</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="flex items-center my-4">
                    <label htmlFor="paid" className="block mb-1">Paid</label>
                    <select id="paid" name="paid" value={filterOptions.paid} onChange={handleInputChange} className="border rounded-md p-2">
                        <option value="">Paid</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="flex items-center my-4">
                    <label htmlFor="workTime" className="block mb-1">Work Time</label>
                    <select id="workTime" name="workTime" value={filterOptions.workTime} onChange={handleInputChange} className="border rounded-md p-2">
                        <option value="">Select Work Time</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="flex items-center my-4">
                    <label htmlFor="minSalary" className="block mb-1">Min Salary</label>
                    <input
                        type="number"
                        id="minSalary"
                        name="minSalary"
                        placeholder="Min Salary" 
                        value={filterOptions.minSalary}
                        onChange={handleInputChange}
                        className="border rounded-md p-2"
                    />
                </div>
                <div className="flex items-center my-4">
                    <label htmlFor="maxSalary" className="block mb-1">Max Salary</label>
                    <input
                        type="number"
                        id="maxSalary"
                        name="maxSalary"
                        placeholder="Max Salary"
                        value={filterOptions.maxSalary}
                        onChange={handleInputChange}
                        className="border rounded-md p-2"
                    />
                </div>
            </div>
            <button onClick={handleApplyFilters} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition-colors">Apply Filters</button>
        </div>
    );
};

export default FilterOptions;
