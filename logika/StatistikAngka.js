function CekPrima(num) {
	if (num < 0) return false;
	if (num == 1) return false;
	if (num == 2 || num == 3) return true;
	else
		for (let i = 2; i <= num / 2; i++) {
			if (num % i == 0) return false;
		}

	return true;
}

function CekGenap(num) {
	if (num % 2 == 0) return true;
	return false;
}

function StatistikAngka(arr) {
	let result = {
		genap: 0,
		ganjil: 0,
		prima: 0,
		komposit: 0
	};

	for (let i = 0; i < arr.length; i++) {
		if (CekGenap(arr[i])) {
			result.genap++;
		} else {
			result.ganjil++;
		}

		if (arr[i] > 1) {
			if (CekPrima(arr[i])) {
				result.prima++;
			} else {
				result.komposit++;
			}
		}
	}

	console.log(result.genap, result.ganjil, result.prima, result.komposit);
	return result;
}

StatistikAngka([1,2,3,4,5,6,7,8,9,10,0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10] )
StatistikAngka([9, 10, 11, 12, 1, 2, 1, -1, -2, -3]);
