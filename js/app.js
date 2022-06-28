window.onload = function() {
    var matriz = [
        [0, 2, 4, 6, 8],
        [1, 3, 5, 7, 9],
        [0, 1, 2, 3, 4],
        [8, 5, 3, 6, 9],
        [0, 9, 4, 8, 7],
        [4, 8, 0, 1, 8]
    ]

    for (let iFila = 0; iFila < matriz.length; iFila++) {
        const element = matriz[iFila];
        for (let iCol = 0; iCol < 5; iCol++) {
            const element = matriz[iCol];
            console.log(matriz[iFila][iCol])
        }
    }
}