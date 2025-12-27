import { Outlet, useNavigate, useOutletContext } from "react-router-dom";


const HomeButton = () => {
    const navigate = useNavigate();
    const context = useOutletContext(); // grab parent context
    
    return (
        <>
        <button onClick={() => navigate("/")}>
            Back to Search
        </button>
        <br />
        <Outlet context={context}/>
    </>
  );
};

export default HomeButton;