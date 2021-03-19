const addStudent = () => {
    const name = $('.name').val();
    const section = $('.section').val();
    const rollno = $('.rollno').val();
    const cgpa = $('.cgpa').val();

    console.log(name);

    const settings = {
        url: '/api/students',
        method: 'POST',
        timeout: 0,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            name,
            section,
            rollno,
            cgpa,
        }),
    };

    $.ajax(settings).done((response) => {
        console.log(response);
        window.location.href = '/';
    });
};