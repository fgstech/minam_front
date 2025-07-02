import React, { useEffect, useState } from "react";
import Applications from "../Applications";
import controller from "./controller";

const StudentProfileApplication = (props) => {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        foto: "",
        biografia: "",
        redes: {},
        certificados: [],
        tags: [],
        cursos: [],
        experiencias: []
    });

    useEffect(async () => {
        if (props?.match?.params?.id) {
            const profile = await controller.load(props?.match?.params?.id);
            const responseData = {
                nombre: profile?.username,
                email: profile?.email,
                telefono: profile?.cf_numerodetelefono,
                direccion: profile?.location,
                foto: profile?.cover,
                biografia: profile?.bio,
                redes: {},
                certificados: profile?.certificates?.map(e => {
                    return { nombre: e.course, emisor: "Academia Ñam", año: "" }
                }),

                tags: profile?.tags,

                cursos: profile?.courses?.map(e => {
                    return { nombre: e.title, status: e.status }
                }),
                experiencias: [
                    // { puesto: "Ayudante de Cocina", empresa: "Restaurante El Sabor", desde: "2023", hasta: "2024" },
                    // { puesto: "Asistente de Catering", empresa: "Eventos Gourmet", desde: "2022", hasta: "2023" }
                ]
            }

            if (profile.linkedin) responseData["redes"]["linkedin"] = profile?.linkedin;
            if (profile.instagram) responseData["redes"]["instagram"] = profile?.instagram;
            if (profile.fb) responseData["redes"]["facebook"] = profile?.fb;

            setData(responseData);
            setLoader(false);
        }
    }, [])

    return {
        loader,
        data
    }
}

export default StudentProfileApplication;