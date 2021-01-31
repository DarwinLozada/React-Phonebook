import React, { useState, useEffect, useRef } from "react";

const Filter = ({ props }) => {
  const { contacts, setContactsToShow } = props;
  const [filterName, setFilterName] = useState("");
  let filteredcontacts = useRef(undefined);

  filteredcontacts.current = contacts.filter((person) => {
    return person.name.toLowerCase().includes(filterName.toLowerCase());
  });

  const handleOnChange = (event) => {
    event.preventDefault();
    setFilterName(event.target.value);
  };

  useEffect(() => {
    setContactsToShow(filteredcontacts.current);
  }, [filterName, setContactsToShow]);

  return (
    <div className="flex flex-col justify-between bg-purple-100 p-4 rounded shadow">
      <p className="tracking-normal font-semibold text-purple-600 mb-3">
        Filter Contacts
      </p>
      <form className="flex flex-col">
        <input
          type="text"
          value={filterName}
          onChange={handleOnChange}
          className="bg-purple-100 border-b-2 mt-2 border-purple-300 outline-none"
        />
      </form>
    </div>
  );
};

export default Filter;
