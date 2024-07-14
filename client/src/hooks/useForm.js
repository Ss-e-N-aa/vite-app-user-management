import { useState, useCallback } from 'react';

const useForm = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const setFormDataState = useCallback((newData) => {
        setFormData(prevData => ({ ...prevData, ...newData }));
    }, []);

    return [formData, handleChange, setFormDataState];
};

export default useForm;


