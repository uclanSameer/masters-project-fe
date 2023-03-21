import { parse } from "cookie";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { GET, GetWithToken, PostWithToken } from "@/utils/requests";
import { ServerSideContext } from "@/model/types";

type Application = {
    applicationId: number;
    userId: number;
    status: string;
};

export default function Applications(props: {
    applications: Array<Application>;
}) {
    const [applications, setApplications] = useState<Array<Application>>(props.applications || []);
    const [statusChanged, setStatusChanged] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("PENDING");

    useEffect(() => {
        if (statusChanged) {
            getApplication(selectedStatus)
                .then((res) => {
                    setApplications(res);
                })
            setStatusChanged(false);
        }
    }, [statusChanged]);

    return (
        <div>
            <h1>Applications</h1>

            <select onChange={(e) => {
                e.preventDefault();
                setSelectedStatus(e.target.value);
                setStatusChanged(true);
            }}>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
            </select>

            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Action</th>
                        <th className="px-4 py-2"></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        applications.map((application, index) => {
                            function approve() {
                                handleApplication(application.applicationId, true);
                            }

                            function reject() {
                                handleApplication(application.applicationId, false);
                            }

                            return (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{application.userId}</td>
                                    <td className="border px-4 py-2">{application.status}</td>
                                    <td className="border px-4 py-2">
                                        <Button onClick={approve}> Approve</Button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Button onClick={reject}> Reject</Button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>

        </div>
    );
}


export async function getServerSideProps(context: ServerSideContext) {
    const { req, res } = context;
    const cookies = parse(req.headers.cookie || '');
    const applications = await GetWithToken("http://localhost:8080/api/v1/applications/?status=PENDING", cookies.token);
    return {
        props: {
            applications: applications.data
        }
    };
}

function getApplication(status: string): Promise<Array<Application>> {
    const url = `http://localhost:8080/api/v1/applications/?status=${status}`;
    return GET<Array<Application>>(url)
        .then((response) => {
            return response.data || [];
        });
}


function handleApplication(applicationId: number, approve: boolean) {
    const status = approve ? "approve" : "reject";
    const url = `http://localhost:8080/api/v1/applications/${status}/${applicationId}`;
    PostWithToken(url, {
        "applicationId": applicationId + ''
    })
        .then(() => {
            const message = `Status of applcation changed to: ${status}`;
            if (approve) {
                toast.success(message, {
                    position: "bottom-right",
                });
            } else {
                toast.error(message, {
                    position: "bottom-right",
                });
            }
        }).catch((error) => {
            console.error("Error approving application", error);
            toast.error("Error approving application");
        });
}