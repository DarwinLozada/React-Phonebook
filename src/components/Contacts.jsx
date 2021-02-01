import React from "react";
import Contact from "./Contact";

const Contacts = ({ props }) => {
  return (
    <div className="flex flex-col mt-4 divide-y">
      {props.contactsToShow.length !== 0 ? (
        props.contactsToShow.map((person) => {
          return (
            <Contact
              contact={{
                id: person.id,
                name: person.name,
                number: person.number,
              }}
              key={person.id}
              setContactsToShow={props.setContactsToShow}
              setContacts={props.setContacts}
            />
          );
        })
      ) : (
        <h1 className="text-gray-400 text-center text-lg mt-20">
          There are no contacts
        </h1>
      )}
    </div>
  );
};

export default Contacts;
