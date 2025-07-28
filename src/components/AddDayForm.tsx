import React, { useState } from "react";
import "../assets/styles/AddDayForm.css";

export const AddDayForm = ({ onAdd }: { onAdd?: () => void }) => {
  const [form, setForm] = useState({
    date: "",
    recording: "",
    study: "",
    computerScience: "",
    wastedTime: "",
    unnecessaryWorks: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/days", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        recording: Number(form.recording),
        study: Number(form.study),
        computerScience: Number(form.computerScience),
        wastedTime: Number(form.wastedTime),
        unnecessaryWorks: Number(form.unnecessaryWorks)
      })
    });
    setForm({
      date: "",
      recording: "",
      study: "",
      computerScience: "",
      wastedTime: "",
      unnecessaryWorks: ""
    });
    if (onAdd) onAdd();
  };

  return (
    <form className="add-day-form" onSubmit={handleSubmit}>
      <h2>Add New Day</h2>
      <div className="form-row">
        <input name="date" placeholder="Date (e.g. July 8)" value={form.date} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <input name="recording" placeholder="Recording" value={form.recording} onChange={handleChange} required />
        <input name="study" placeholder="Study" value={form.study} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <input name="computerScience" placeholder="Computer Science" value={form.computerScience} onChange={handleChange} required />
        <input name="wastedTime" placeholder="Wasted Time" value={form.wastedTime} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <input name="unnecessaryWorks" placeholder="Unnecessary Works" value={form.unnecessaryWorks} onChange={handleChange} required />
      </div>
      <button className="submit-btn" type="submit">Add Day</button>
    </form>
  );
};