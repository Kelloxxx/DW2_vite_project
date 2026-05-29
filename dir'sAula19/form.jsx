import { useState} from "react";
function Formulario() {
    const[ nome , setNome ] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        alert(`Nome enviado: ${nome}`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            />
            <button type="submit">Enviar</button>
        </form>
    );
}