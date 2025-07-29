import respond from "~/images/diagram/system.svg";

const System = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            margin: '20px 0'
        }}>
            <img src={respond} alt="RESPOND model structure diagram"
		 style={{ width: '80%', height: 'auto' }} />
        </div>
    );
};

export default System;
