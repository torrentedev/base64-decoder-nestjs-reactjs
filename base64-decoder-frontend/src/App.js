// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   const [base64String, setBase64String] = useState('');
//   const [message, setMessage] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [resize, setResize] = useState(false);
//   const [resizeValue, setResizeValue] = useState(100);
//   const [compress, setCompress] = useState(false);
//   const [convertToJpg, setConvertToJpg] = useState(false);
//   const [details, setDetails] = useState(null);
//   const [htmlString, setHtmlString] = useState('');
//   const [base64ImageCount, setBase64ImageCount] = useState(0);
//   const [tool, setTool] = useState('base64');

//   const handleHtmlChange = (e) => {
//     const html = e.target.value;
//     setHtmlString(html);
//     const base64ImageRegex = /<img\s+src=["']data:image\/(?:png|jpeg|jpg);base64,[^"']+["']/gi;
//     const matches = [...html.matchAll(base64ImageRegex)];
//     setBase64ImageCount(matches.length);
//   };

//   const handleSubmitBase64 = async (event) => {
//     event.preventDefault();

//     try {
//       const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
//       const response = await axios.post('http://localhost:3000/image/decode', {
//         base64: base64Data,
//         resize,
//         resizeValue,
//         compress,
//         convertToJpg
//       });

//       setMessage(response.data.message);
//       setImageUrl(`data:image/${convertToJpg ? 'jpeg' : 'png'};base64,${response.data.image}`);
//       setDetails(response.data.details);
//       toast.success('Conversión exitosa');
//       downloadImage(response.data.image, convertToJpg ? 'imagen.jpg' : 'imagen.png');
//     } catch (error) {
//       setMessage('Error al decodificar la imagen');
//       toast.error('Error en la conversión');
//     }
//   };

//   const handleSubmitHtml = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/html-to-docx/convert', {
//         html: htmlString,
//         resize,
//         resizeValue,
//         compress,
//         convertToJpg
//       }, { responseType: 'blob' });

//       const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = 'documento.docx';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       toast.success('HTML convertido a DOCX exitosamente');
//     } catch (error) {
//       toast.error('Error al convertir HTML a DOCX');
//     }
//   };

//   const downloadImage = (base64Data, fileName) => {
//     const link = document.createElement('a');
//     link.href = `data:image/${convertToJpg ? 'jpeg' : 'png'};base64,${base64Data}`;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleNewDecoding = () => {
//     setBase64String('');
//     setMessage('');
//     setImageUrl('');
//     setResize(false);
//     setResizeValue(100);
//     setCompress(false);
//     setConvertToJpg(false);
//     setDetails(null);
//     setHtmlString('');
//     setBase64ImageCount(0);
//     setTool('base64');
//     toast.info('Formulario reiniciado');
//   };

//   return (
//     <div className="App">
//       <h1>Decodificador de Imagen Base64 / Convertidor de HTML a DOCX</h1>
//       <p className="instruction">Selecciona la herramienta que deseas usar y sigue las instrucciones.</p>
//       <div className="tool-selection">
//         <label>
//           <input type="radio" value="base64" checked={tool === 'base64'} onChange={() => setTool('base64')} />
//           Decodificador de Imagen Base64
//         </label>
//         <label>
//           <input type="radio" value="html" checked={tool === 'html'} onChange={() => setTool('html')} />
//           Convertidor de HTML a DOCX
//         </label>
//       </div>
//       {tool === 'base64' ? (
//         <form onSubmit={handleSubmitBase64} className="form">
//           <textarea 
//             value={base64String}
//             onChange={(e) => setBase64String(e.target.value)}
//             placeholder="Pega el código base64 de la imagen aquí"
//             rows="10"
//             cols="50"
//             className="textarea"
//           />
//           <div className="options">
//             <label>
//               <input type="checkbox" checked={resize} onChange={() => setResize(!resize)} />
//               Redimensionar
//             </label>
//             {resize && (
//               <select value={resizeValue} onChange={(e) => setResizeValue(Number(e.target.value))}>
//                 {[...Array(10).keys()].map(i => (
//                   <option key={i} value={(i + 1) * 10}>{(i + 1) * 10}%</option>
//                 ))}
//               </select>
//             )}
//             <label>
//               <input type="checkbox" checked={compress} onChange={() => setCompress(!compress)} />
//               Comprimir
//             </label>
//             <label>
//               <input type="checkbox" checked={convertToJpg} onChange={() => setConvertToJpg(!convertToJpg)} />
//               Convertir a JPG
//             </label>
//           </div>
//           <button type="submit" className="button">Decodificar Imagen</button>
//           <button type="button" className="button" onClick={handleNewDecoding}>Nueva Decodificación</button>
//         </form>
//       ) : (
//         <form onSubmit={handleSubmitHtml} className="form">
//           <textarea 
//             value={htmlString}
//             onChange={handleHtmlChange}
//             placeholder="Pega el código HTML aquí"
//             rows="10"
//             cols="50"
//             className="textarea"
//           />
//           <div className="options">
//             <label>
//               <input type="checkbox" checked={resize} onChange={() => setResize(!resize)} />
//               Redimensionar Imágenes
//             </label>
//             {resize && (
//               <select value={resizeValue} onChange={(e) => setResizeValue(Number(e.target.value))}>
//                 {[...Array(10).keys()].map(i => (
//                   <option key={i} value={(i + 1) * 10}>{(i + 1) * 10}%</option>
//                 ))}
//               </select>
//             )}
//             <label>
//               <input type="checkbox" checked={compress} onChange={() => setCompress(!compress)} />
//               Comprimir Imágenes
//             </label>
//             <label>
//               <input type="checkbox" checked={convertToJpg} onChange={() => setConvertToJpg(!convertToJpg)} />
//               Convertir Imágenes a JPG
//             </label>
//           </div>
//           <p>Cantidad de imágenes base64 detectadas: {base64ImageCount}</p>
//           <button type="submit" className="button">Convertir HTML a DOCX</button>
//           <button type="button" className="button" onClick={handleNewDecoding}>Nueva Conversión</button>
//         </form>
//       )}
//       {message && <p className="message">{message}</p>}
//       {imageUrl && <img src={imageUrl} alt="Decoded" className="image" />}
//       {details && (
//         <table className="details-table">
//           <thead>
//             <tr>
//               <th>Operación</th>
//               <th>Valor</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(details).map(key => (
//               <tr key={key}>
//                 <td>{key}</td>
//                 <td>{details[key]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <ToastContainer />
//     </div>
//   );
// }

// export default App;


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
  const [htmlString, setHtmlString] = useState('');
  const [base64ImageCount, setBase64ImageCount] = useState(0);
  const [tool, setTool] = useState('base64');
  

  const handleHtmlChange = (e) => {
    const html = e.target.value;
    setHtmlString(html);
    updateBase64ImageCount(html);
  };

  const handleCleanAspectRatio = async () => {
    try {
      const response = await axios.post('http://localhost:3000/html-to-docx/clean-aspect-ratio', { html: htmlString });
      setHtmlString(response.data.cleanedHtml);
      toast.success(`Se eliminaron ${response.data.count} variaciones de aspect-ratio`);
    } catch (error) {
      toast.error('Error al limpiar aspect-ratio');
    }
  };

  const updateBase64ImageCount = (html) => {
    const base64ImageRegex = /<img\s+src=["']data:image\/(?:png|jpeg|jpg);base64,[^"']+["']/gi;
    const matches = [...html.matchAll(base64ImageRegex)];
    setBase64ImageCount(matches.length);
  };

  const cleanHtml = (html) => {
    return html.replace(/\\"/g, '"');
  };

  const handleCleanBase64Html = () => {
    const cleanedHtml = cleanHtml(htmlString);
    setHtmlString(cleanedHtml);
    updateBase64ImageCount(cleanedHtml);
    toast.success('HTML limpiado correctamente');
  };

  const handleSubmitBase64 = async (event) => {
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

  const handleSubmitHtml = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/html-to-docx/convert', {
        html: htmlString,
        resize,
        resizeValue,
        compress,
        convertToJpg
      }, { responseType: 'blob' });

      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'documento.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('HTML convertido a DOCX exitosamente');
    } catch (error) {
      toast.error('Error al convertir HTML a DOCX');
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
    setHtmlString('');
    setBase64ImageCount(0);
    setTool('base64');
    toast.info('Formulario reiniciado');
  };

  return (
    <div className="App">
      <h1>Decodificador de Imagen Base64 / Convertidor de HTML a DOCX</h1>
      <p className="instruction">Selecciona la herramienta que deseas usar y sigue las instrucciones.</p>
      <div className="tool-selection">
        <label>
          <input type="radio" value="base64" checked={tool === 'base64'} onChange={() => setTool('base64')} />
          Decodificador de Imagen Base64
        </label>
        <label>
          <input type="radio" value="html" checked={tool === 'html'} onChange={() => setTool('html')} />
          Convertidor de HTML a DOCX
        </label>
      </div>
      {tool === 'base64' ? (
        <form onSubmit={handleSubmitBase64} className="form">
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
      ) : (
        <form onSubmit={handleSubmitHtml} className="form">
          <textarea 
            value={htmlString}
            onChange={handleHtmlChange}
            placeholder="Pega el código HTML aquí"
            rows="10"
            cols="50"
            className="textarea"
          />
          <div className="options">
            <label>
              <input type="checkbox" checked={resize} onChange={() => setResize(!resize)} />
              Redimensionar Imágenes
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
              Comprimir Imágenes
            </label>
            <label>
              <input type="checkbox" checked={convertToJpg} onChange={() => setConvertToJpg(!convertToJpg)} />
              Convertir Imágenes a JPG
            </label>
          </div>
          <p>Cantidad de imágenes base64 detectadas: {base64ImageCount}</p>
          <button type="submit" className="button">Convertir HTML a DOCX</button>
          <button type="button" className="button" onClick={handleCleanBase64Html}>Limpiar código base64</button>
          <button type="button" className="button" onClick={handleCleanAspectRatio}>Limpiar aspect-ratio</button>
          <button type="button" className="button" onClick={handleNewDecoding}>Nueva Conversión</button>
        </form>
      )}
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
