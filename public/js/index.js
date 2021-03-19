const go = () => {
    const sortDropdown = $('#sortDropdown').val();
    const searchDropdown = $('#searchDropdown').val();
    searchby = searchDropdown.toLowerCase();
    search = $('#search').val().toLowerCase();
    order = $('#order').val().toLowerCase();
    sortby = sortDropdown.toLowerCase();
    const newUrl = `?${limit ? 'limit=' + limit + '&' : ''}${page ? 'page=' + page + '&' : ''
        }${searchby ? 'searchby=' + searchby + '&' : ''}
			${search ? 'search=' + search + '&' : ''}
			${sortby ? 'sortby=' + sortby + '&' : ''}${order ? 'order=' + order + '&' : ''
        }`;
    console.log(newUrl);
    window.location.href = newUrl;
};


$('#inputState2').change(function () {
    let rpp = this.value; //rows per page
    if (rpp == 'All') rpp = 'inf';
    else rpp = +rpp;

    window.location.href = `?${limit ? 'limit=' + rpp + '&' : ''}${page ? 'page=1' + '&' : ''
        }${searchby ? 'searchby=' + searchby + '&' : ''}
			${search ? 'search=' + search + '&' : ''}
			${sortby ? 'sortby=' + sortby + '&' : ''}${order ? 'order=' + order + '&' : ''
        }`;
});


const prev = () => {
    window.location.href = `?${limit ? 'limit=' + limit + '&' : ''
        }${page ? 'page=' + (+page - 1) + '&' : ''}${searchby ? 'searchby=' + searchby + '&' : ''
        }
			${search ? 'search=' + search + '&' : ''}
			${sortby ? 'sortby=' + sortby + '&' : ''}${order ? 'order=' + order + '&' : ''
        }`;
};


const next = () => {
    window.location.href = `?${limit ? 'limit=' + limit + '&' : ''
        }${page ? 'page=' + (+page + 1) + '&' : ''}${searchby ? 'searchby=' + searchby + '&' : ''
        }
			${search ? 'search=' + search + '&' : ''}
			${sortby ? 'sortby=' + sortby + '&' : ''}${order ? 'order=' + order + '&' : ''
        }`;
};


let limit, page, sortby, order, searchby, search;
$(document).ready(async function () {
    let searchParams = new URLSearchParams(window.location.search);
    searchby = await searchParams.get('searchby');
    search = await searchParams.get('search');
    sortby = await searchParams.get('sortby');
    order = await searchParams.get('order');
    page = await searchParams.get('page');
    limit = await searchParams.get('limit');
    if (!limit) window.location.href = `?limit=5&page=1`;
    $('#inputState2').prepend(`<option selected>${limit}</option>`);
    loadData(limit, page, sortby, order, searchby, search);
});

const loadData = (limit, page, sortby, order, searchby, search) => {
    const settings = {
        url: `/api/students?${limit ? 'limit=' + limit + '&' : ''}${page ? 'page=' + page + '&' : ''
            }${searchby ? 'searchby=' + searchby + '&' : ''}
					${search ? 'search=' + search + '&' : ''}
					${sortby ? 'sortby=' + sortby + '&' : ''}${order ? 'order=' + order + '&' : ''
            }`,
        method: 'GET',
        timeout: 0,
    };

    $.ajax(settings).done(function (response) {
        if (!response.success) {
            console.log(response.error);
            return;
        }
        response.data.forEach((student) => {
            $('tbody').append(
                getRow(
                    student.name,
                    student.rollno,
                    student.section,
                    student.cgpa
                )
            );
        });
    });
};


const getRow = (name, rollno, section, cgpa) => {
    return ` 
			<tr>
                <td>${name}</td>
				<td>${rollno}</td>
				<td>${section}</td>
				<td>${cgpa}</td>
			</tr>
			`;
};


function fnExcelReport() {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange;
    var j = 0;
    tab = document.getElementById('reportTable'); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + '</tr>';
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + '</table>';
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ''); //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ''); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ''); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (
        msie > 0 ||
        !!navigator.userAgent.match(/Trident.*rv\:11\./)
    ) {
        // If Internet Explorer
        txtArea1.document.open('txt/html', 'replace');
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand(
            'SaveAs',
            true,
            'Say Thanks to Sumit.xls'
        );
    } //other browser not tested on IE 11
    else
        sa = window.open(
            'data:application/vnd.ms-excel,' +
            encodeURIComponent(tab_text)
        );

    return sa;
}