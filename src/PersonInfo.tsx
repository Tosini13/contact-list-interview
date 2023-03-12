import React from "react";

type Props = {
  data: {
    id: string;
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
};

function PersonInfo(props: Props) {
  const { data, isSelected, onSelect } = props;

  const initials = React.useMemo(
    () =>
      data.firstNameLastName
        .split(" ")
        .map((name) => name.charAt(0))
        .join(""),
    [data.firstNameLastName]
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: "25px",
        paddingBottom: "40px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 0",
        background: "#fff",
        cursor: "pointer",
        minWidth: "350px",
        gap: "43px",
        outline: isSelected ? "1px solid green" : "none",
      }}
      className="person-info"
      onClick={() => onSelect(data.id)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="initials">{initials}</div>
        <div>
          <div className="firstNameLastName">{data.firstNameLastName}</div>
          <div className="jobTitle">{data.jobTitle}</div>
        </div>
      </div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default React.memo(PersonInfo);
