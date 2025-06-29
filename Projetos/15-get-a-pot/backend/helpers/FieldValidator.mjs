class FieldValidator{
    static requiredField(value){
        if (value === undefined || value === null) {
            return false;
        }
        return true;
    }

    static fieldsAreEqual(...values){
        if (values.length === 0) return true;
        return values.every(v => v === values[0]);
    }
}

export default FieldValidator;