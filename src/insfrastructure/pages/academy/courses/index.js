import React from "react";
import AcademyCoursesApplication from "../../../../application/academy/courses";
import Page from "../../../ui/page";
import DynamicTable from "../../../ui/table2";
import Loader from "../../../ui/loader";


const CoursesView = ({ ...props }) => {
    const { courses, columns, customElements, loaderData } = AcademyCoursesApplication(props);
    return <>
        <h6><strong>Mis Cursos</strong></h6>
        <Page>
            <DynamicTable
                headers={columns}
                data={courses}
                customElements={customElements}
                tableLabel="Mis Cursos"
                fullPage={true}
                showLabel={false}
                isLoading={loaderData}
                loaderComponent={<Loader text="Cargando datos, por favor espera..." />}
                emptyText="No hay registros en la base de datos."
            />
        </Page>
    </>
}

export default CoursesView;