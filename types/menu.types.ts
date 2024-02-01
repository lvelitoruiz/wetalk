export interface MenuData {
	id?: number;
	etiqueta: string;
	nombre: string;
	icono?: string;
	submenu?: [] | MenuData[];
	url: string | null;
}

export interface MainMenuData {
	data: null | MenuData[] | [];
	pending: unknown;
	error: unknown;
}

export interface MenuHeaderData {
	id: number;
	titulo: string;
	descripcion: string;
	parent: string;
	imagen: string;
	abrir_nueva_pagina: boolean;
	secuencia: number;
	date_created: string | null;
	submenu: [] | MenuHeaderData[];
	url: string | null;
}

export interface HeaderMenuData {
	data: null | MenuHeaderData[] | [];
	pending: unknown;
	error: unknown;
}
