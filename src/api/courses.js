import axios from 'axios';

export default class CoursesAPI {
    static getCourses(userId) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/school/courses/${userId}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getUser(email) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/school`, { email })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getCetificates(userId) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/school/certificates/${userId}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
} 