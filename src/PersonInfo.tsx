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
      data-testid="personal-info"
      style={{
        outline: isSelected ? "1px solid green" : "none",
      }}
      className="person-info"
      onClick={() => onSelect(data.id)}
    >
      <div className="person-info-header">
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
