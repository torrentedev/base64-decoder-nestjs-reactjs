import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [base64String, setBase64String] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [resize, setResize] = useState(false);
  const [resizeValue, setResizeValue] = useState(100);
  const [compress, setCompress] = useState(false);
  const [convertToJpg, setConvertToJpg] = useState(false);
  const [details, setDetails] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
      const response = await axios.post('http://localhost:3000/image/decode', {
        base64: base64Data,
        resize,
        resizeValue,
        compress,
        convertToJpg
      });

      setMessage(response.data.message);
      setImageUrl(`data:image/${convertToJpg ? 'jpeg' : 'png'};base64,${response.data.image}`);
      setDetails(response.data.details);
      toast.success('Conversión exitosa');
      downloadImage(response.data.image, convertToJpg ? 'imagen.jpg' : 'imagen.png');
    } catch (error) {
      setMessage('Error al decodificar la imagen');
      toast.error('Error en la conversión');
    }
  };

  const downloadImage = (base64Data, fileName) => {
    const link = document.createElement('a');
    link.href = `data:image/${convertToJpg ? 'jpeg' : 'png'};base64,${base64Data}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewDecoding = () => {
    setBase64String('');
    setMessage('');
    setImageUrl('');
    setResize(false);
    setResizeValue(100);
    setCompress(false);
    setConvertToJpg(false);
    setDetails(null);
    toast.info('Formulario reiniciado');
  };

  return (
    <div className="App">
      <h1>Decodificador de Imagen Base64</h1>
      <p className="instruction">En el cuadro de texto pega el código base64. Puedes copiarlo con o sin la etiqueta <code>data:image/png;base64,</code> ya que el backend hace la verificación.</p>
      <form onSubmit={handleSubmit} className="form">
        <textarea 
          value={base64String}
          onChange={(e) => setBase64String(e.target.value)}
          placeholder="Pega el código base64 de la imagen aquí"
          rows="10"
          cols="50"
          className="textarea"
        />
        <div className="options">
          <label>
            <input type="checkbox" checked={resize} onChange={() => setResize(!resize)} />
            Redimensionar
          </label>
          {resize && (
            <select value={resizeValue} onChange={(e) => setResizeValue(Number(e.target.value))}>
              {[...Array(10).keys()].map(i => (
                <option key={i} value={(i + 1) * 10}>{(i + 1) * 10}%</option>
              ))}
            </select>
          )}
          <label>
            <input type="checkbox" checked={compress} onChange={() => setCompress(!compress)} />
            Comprimir
          </label>
          <label>
            <input type="checkbox" checked={convertToJpg} onChange={() => setConvertToJpg(!convertToJpg)} />
            Convertir a JPG
          </label>
        </div>
        <button type="submit" className="button">Decodificar Imagen</button>
        <button type="button" className="button" onClick={handleNewDecoding}>Nueva Decodificación</button>
      </form>
      {message && <p className="message">{message}</p>}
      {imageUrl && <img src={imageUrl} alt="Decoded" className="image" />}
      {details && (
        <table className="details-table">
          <thead>
            <tr>
              <th>Operación</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(details).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{details[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
