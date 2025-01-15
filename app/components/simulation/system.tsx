import respond7 from "./images/diagram/7.png";
import respond8 from "./images/diagram/8.png";

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
            <img src={respond7} alt="Diagram 7" style={{ width: '80%', maxWidth: '800px', height: 'auto' }} />
            <img src={respond8} alt="Diagram 8" style={{ width: '80%', maxWidth: '500px', height: 'auto' }} />
        </div>
    );
};

export default System;
