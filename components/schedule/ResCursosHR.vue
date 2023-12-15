<script setup>
const props = defineProps({
	data: {
		type: Array,
		default: []
	}
})

const codCursos = () => {
	let arrCursos = props.data.map((item) => {
		let itemFiltrado = item.ListaDTOHorarioAlumnoDet;
		return itemFiltrado;
	}).flat();

	let hash = {};
	let arregloSinRepetidos = arrCursos.filter(function (item) {
		let go = item.CodCurso !== undefined ? String(item.CodCurso) : "";
		let exists = !hash[go] || false;
		hash[go] = true;
		return exists;
	});

	arregloSinRepetidos = JSON.parse(JSON.stringify(arregloSinRepetidos));
	return arregloSinRepetidos;
}
</script>

<template >
	<div class="px-3 py-4 mt-5 bg-white border-l-secondary-400 border-l-4"
		style="height: inherit !important; width: 100%" v-for="(curso, cursos) in codCursos()" :key="cursos">
		<ScheduleCardCurso :i="curso" />
	</div>
</template>

<style >
.content-sec-record .item_curso {
	padding-bottom: 0;
}

.content-sec-record .content_detalls {
	font-size: 12px;
}

.list-right li a {
	color: #191919;
	text-decoration: underline;
}

.list-right li:hover a {
	color: #E50A17;
}
</style>