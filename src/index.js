// Validator - Data validation library with schema support
class Validator {
    constructor() {
        this.rules = {};
    }
    
    addRule(name, rule) {
        this.rules[name] = rule;
    }
    
    validate(data, schema) {
        const errors = [];
        
        for (const [key, rules] of Object.entries(schema)) {
            const value = data[key];
            
            if (rules.required && (value === undefined || value === null)) {
                errors.push({ field: key, error: 'Required field' });
            }
            
            if (rules.type && value !== undefined && typeof value !== rules.type) {
                errors.push({ field: key, error: `Expected type ${rules.type}` });
            }
            
            if (rules.min && value !== undefined && value.length < rules.min) {
                errors.push({ field: key, error: `Minimum length is ${rules.min}` });
            }
            
            if (rules.max && value !== undefined && value.length > rules.max) {
                errors.push({ field: key, error: `Maximum length is ${rules.max}` });
            }
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    }
}

module.exports = Validator;
