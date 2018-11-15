var data = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    data += chunk;
});

function toHTML(obj) {
    return '<tr>' +
        '<td>${obj.code}</td>' +
        '<td>${obj.msg}</td>' +
    '</tr>';
}

process.stdin.on('end', function() {
    var issues = JSON.parse(data);
    var html = '<table>' +
        '<thead>' +
          '  <tr>' +
                '<th>Code</th>' +
                '<th>Message<th>' +
            '</tr>' +
        '</thead>' +
        '<tbody>' +
            issues.map(toHTML).join('') +
        '</tbody>' +
    '</table>';
    console.log(html);
});
