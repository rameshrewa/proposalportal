const FileValidation = (props) => {
  let testFile = props;
  if(testFile!=''){
  
  let fileExtension = testFile.type.split("/").pop();
  if (
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "gif" ||
    fileExtension === "pdf"
  ) {
    return true;
  } else {
    return false;
  }

}else{
  return false;
}
};
const ImageFileValidation = (props) => {
  let testFile = props;
  if(testFile!=''){
  
  let fileExtension = testFile.type.split("/").pop();
  if (
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg"
  ) {
    return true;
  } else {
    return false;
  }

}else{
  return false;
}
};
const BgStatus = (props) => {
  const status =
    props &&
    (props === "Reviewed by Prefect" || props === "Prefect approval pending")
      ? "prefect"
      : props && props === "Reviewed by cc"
      ? "cc"
      : props && props === "Reviewed by zc"
      ? "zc"
      : props && props === "Reviewed by hr"
      ? "hr"
      : props && props === "Reviewed by admin"
      ? "admin"
      : "prefect";
  return status;
};
const ApiBgStatus = (props) => {
  if (props) {
    const status =
      props === "Reviewed by prefect"
        ? "cc"
        : props === "Reviewed by cc"
        ? "zc"
        : props === "Reviewed by zc"
        ? "hr"
        : props === "Reviewed by hr"
        ? "admin"
        : props === "Reviewed by admin"
        ? "admin"
        : "prefect";
    return status;
  }
};
const ApiBgStatus1 = (props) => {
  if (props) {
    const status =
      props === "cc_approval_pending"
        ? "cc"
        : props === "zc_approval_pending"
        ? "zc"
        : props === "hr_approval_pending"
        ? "hr"
        : props === "admin_approval_pending"
        ? "admin"
        : "prefect";
    return status;
  }
};
const ApinextStatus = (props) => {
  if (props) {
    const status =
      props === "reviewed_by_prefect" || props === "prefector_approval_pending"
        ? "cc"
        : props === "cc_approval_pending"
        ? "zc"
        : props === "zc_approval_pending"
        ? "hr"
        : props === "hr_approval_pending"
        ? "admin"
        : "prefect";
    return status;
  }
};
const StatusShow = (props) => {
  if (props) {
    const status =
      props.value === "reviewed_by_prefect" ||
      props.value === "prefector_approval_pending"
        ? "Prefect "
        : props.value === "cc_approval_pending"
        ? "CC "
        : props.value === "zc_approval_pending"
        ? "ZC "
        : props.value === "hr_approval_pending"
        ? "HR "
        : props.value === "admin_approval_pending"
        ? "Admin "
        : "Prefect ";
    return status;
  }
};
const BgStatusBack = (props) => {
  const status =
    props && props.value === "prefect"
      ? "Prefect "
      : props && props.value === "cc"
      ? "CC "
      : props && props.value === "zc"
      ? "ZC "
      : props && props.value === "hr"
      ? "HR "
      : "Prefect";
  return status;
};

const FileSizeCheck = (props) => {
  const MIN_FILE_SIZE = 1024; // 1MB
  let testFile = props;
  const fsize = testFile.size;
  const filevall = Math.round(fsize / 1024);
  const fileSize = filevall > MIN_FILE_SIZE;
  return fileSize;
};

export {
  FileValidation,
  ImageFileValidation,
  BgStatus,
  BgStatusBack,
  ApiBgStatus,
  ApinextStatus,
  ApiBgStatus1,
  StatusShow,
  FileSizeCheck,
};
