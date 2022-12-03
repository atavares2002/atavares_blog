import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const commentElement = useRef();
  // const nameElement = useRef();
  // const emailElement = useRef();
  // const storeDataElement = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", comment: "", storeData: false });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      storeData: window.localStorage.getItem("name") || window.localStorage.getItem("email"),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleCommentSubmission = () => {
    setError(false);
    // const { value: comment } = commentElement.current;
    // const { value: name } = nameElement.current;
    // const { value: email } = emailElement.current;
    // const { checked: storeData } = storeDataElement.current;
    // if (!comment || !name || !email) {
    //   setError(true);
    //   return;
    // }
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObject = { name, email, comment, slug };
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }
    submitComment(commentObject).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = "";
          formData.email = "";
        }
        formData.comment = "";
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Deixe um comentário</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-white text-gray-800" name="comment" placeholder="Insira um comentário..." />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" value={formData.name} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-white text-gray-800" placeholder="Nome" name="name" />
        <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-white text-gray-800" placeholder="E-mail" name="email" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            {" "}
            Salvar meus dados neste navegador para os próximos comentários.
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">Todos os Campos devem Ser preenchidos.</p>}
      <div className="mt-8">
        <button type="button" onClick={handleCommentSubmission} className="transition duration-200 ease hover:bg-[#afb839] px-4 py-2 rounded-full border border-[#afb839] hover:text-white">
          Postar
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comentário enviado para avaliação. Obrigado.</span>}
      </div>
    </div>
  );
};
export default CommentsForm;
