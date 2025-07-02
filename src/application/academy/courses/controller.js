import Applications from "../../Applications";
import CoursesAPI from "../../../api/courses";

class CoursesController {
    columns = [
        { key: 'courseImage', label: 'Imagen' },
        { key: 'title', label: 'Nombre' },
        { key: 'description', label: 'Descripción' },
        { key: 'status', label: 'Estado' },
        { key: 'total_progress', label: 'Progreso', textAlign:"center" },
        { key: 'actions', label: 'Acciones' }
    ];

    async getCourses(id) {
        return new Promise((resolve, reject) => {
            CoursesAPI.getCourses(id)
                .then(res => {
                    const courses = res.data;
                    Applications.updateState(state => ({ courses }));
                    resolve(courses);
                })
                .catch(err => reject(err))
        })
    }
}


export default new CoursesController();