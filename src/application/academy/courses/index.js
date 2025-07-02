import React, { useState, useEffect } from 'react'
import { IconButton } from '../../../insfrastructure/ui/button';
import Applications from '../../Applications';
import NavigationService from '../../../utils/history';
import CoursesController from './controller';

const AcademyCoursesApplication = (props) => {
    const [courses, setCourses] = useState(Applications.state.courses)
    const [loaderData, setLoaderData] = useState(false);
    const [view, setView] = useState(null)

    const columns = CoursesController.columns;
    const customElements = {
        actions: (user) => {
            return <div className="table-controls-td-2">
                <IconButton onClick={() => downloadCertificate(user.certificate.short_url)} disabled={user.certificate == null}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C15.7279 15 18.75 12.0899 18.75 8.5C18.75 4.91015 15.7279 2 12 2C8.27208 2 5.25 4.91015 5.25 8.5C5.25 12.0899 8.27208 15 12 15Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.51999 13.52L7.51001 20.9C7.51001 21.8 8.14001 22.24 8.92001 21.87L11.6 20.6C11.82 20.49 12.19 20.49 12.41 20.6L15.1 21.87C15.87 22.23 16.51 21.8 16.51 20.9V13.34" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
                <IconButton onClick={() => goCoursePage(user.id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.29 9.17005L7.70002 3.07005C4.95002 1.62005 1.96002 4.55005 3.35002 7.33005L4.97002 10.57C5.42002 11.47 5.42002 12.53 4.97002 13.43L3.35002 16.67C1.96002 19.45 4.95002 22.37 7.70002 20.93L19.29 14.83C21.57 13.63 21.57 10.37 19.29 9.17005Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
            </div>
        },
        courseImage: (user) => (
            <div>
                <img style={{ width: 40, height: 40, borderRadius: 10 }} src={user.courseImage} />
            </div>
        ),
        description: (user) => user?.description ? user?.description?.slice(0, 80) + "..." : "Sin descripción",
        total_progress: (user) => {
            return <div style={{ textAlign: "center", fontWeight: 700 }}>{user.progress.average_score_rate + "%"}</div>
        },

        status: (user) => {
            let status = "";
            let color = "#bdc3c7";
            switch (user.progress.status) {
                case "not_started":
                    status = "No iniciado";
                    color = "#bdc3c7";
                    break;
                case "completed":
                    status = "Completado";
                    color = "#1abc9c";
                    break;
                case "not_completed":
                    status = "En progreso";
                    color = "#e74c3c";
                    break;
                default:
                    status = "No iniciado";
                    color = "#bdc3c7";
            }

            return <div style={{ textAlign: "center", fontWeight: 700, background: color, borderRadius: 5, padding: "0 5px", color: "#fff" }}>{status}</div>
        }
    };

    useEffect(async () => {
        Applications.on("courses", data => {
            setCourses(data)
            setLoaderData(false);
        })
        Applications.on("vcourse", (data) => setView(data));
        setLoaderData(Applications.state.courses.length == 0);
        CoursesController.getCourses(await Applications.getIdLw());
        if (props && props.params && props.params.id) {
            // CoursesController.getPatientById(props.params.id);
        }
    }, []);


    const editData = (key, value) => {
        setView(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const goView = (id) => NavigationService.navigateTo(`/academia/cursos/${id}`);
    const goBack = () => NavigationService.navigateBack()

    const downloadCertificate = (url) => {
        window.open(url, "_blank");
    }

    const goCoursePage = (course_id) => {
        window.open(`https://academia.xn--am-yja.org/course/${course_id}`, "_blank");
    }


    return {
        courses,
        columns,
        customElements,
        loaderData,
        goBack,
    }
}


export default AcademyCoursesApplication;