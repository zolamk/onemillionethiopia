function isEmpty(value) {

    return (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0))

}

export default {
    data() {
        return {
            rules: {
                required: [(v) => (v !== undefined && v !== null && !isEmpty(v)) || "Required"],
                email: [
                    (v) =>
                        !v ||
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                            v
                        ) ||
                        "Invalid Email Address"
                ],
                password: [
                    (v) =>
                        (!!v && v.length >= 8) || "Password must be 8 or more characters"
                ],
                equals(v2) {
                    return (v) => v2 === v || "Values Don't match"
                },
                phone_number: [
                    (v) => !v ||
                        /^\+\d{5,15}$/.test(
                            v
                        ) ||
                        "Invalid Phone Number"
                ]
            }
        }
    }
}
