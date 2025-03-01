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
            return <div className="table-controls-td">
                {user.certificate ?
                    <IconButton onClick={() => downloadCertificate(user.certificate.short_url)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C15.7279 15 18.75 12.0899 18.75 8.5C18.75 4.91015 15.7279 2 12 2C8.27208 2 5.25 4.91015 5.25 8.5C5.25 12.0899 8.27208 15 12 15Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.51999 13.52L7.51001 20.9C7.51001 21.8 8.14001 22.24 8.92001 21.87L11.6 20.6C11.82 20.49 12.19 20.49 12.41 20.6L15.1 21.87C15.87 22.23 16.51 21.8 16.51 20.9V13.34" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </IconButton> : <></>}
                <IconButton onClick={() => goCoursePage(user.id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
            </div>
        },
        courseImage: (user) => (
            <div>
                <img style={{ width: 40, height: 40, borderRadius: 10 }} src={user.courseImage} />
            </div>
        ),
        description: (user) => user.description.slice(0, 80) + "...",
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