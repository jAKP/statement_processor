function getrecord(record) {
	var newarr = [];
	newarr.push(record._reference);
	newarr.push(record.accountNumber);
	newarr.push(record.description);
	newarr.push(record.startBalance);
	newarr.push(record.mutation);
	newarr.push(record.endBalance);
	return newarr;
}

function convert(num) {
	return Math.round(parseFloat(num) * 100) / 100;
};
