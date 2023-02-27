
 const deleteAll = () => {
    let confirmMessage = confirm("Opravdu chceš vše vymazat?");
        if (confirmMessage) {
            localStorage.clear();
            window.location.reload();
            alert("Data byly úspěšně vymazány");
        } else {
            window.location.reload();
            alert("Zrušeno, data byly zachvány!");
        }
                
}
  