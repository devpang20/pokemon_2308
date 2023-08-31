import { useNavigate, useParams } from "react-router-dom";

function PokeDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // URL id 값 얻어오기

    return ( 
    <>
        <button onClick={() => navigate(-1)}>뒤로가기</button> 
        <hr />
        <div
            style={{
                display: "flex", 
                alignItems:"center", 
                borderBottom:"1px solid black"
            }}
        >
            <img src={`https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon/${id}.png`} alt="포켓몬 이미지" />
            {id}번 포켓몬 상세페이지
        </div>
    </>
    );
    
}

export default PokeDetailPage;