import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DefaultService {
	private _calendar = {
		firstDayOfWeek: 1,
		dayNames: [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado'
		],
		dayNamesShort: [
			'Dom',
			'Lun',
			'Mar',
			'Mié',
			'Jue',
			'Vie',
			'Sáb'
		],
		dayNamesMin: [
			'D',
			'L',
			'M',
			'X',
			'J',
			'V',
			'S'
		],
		monthNames: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		],
		monthNamesShort: [
			'Ene',
			'Feb',
			'Mar',
			'Abr',
			'May',
			'Jun',
			'Jul',
			'Ago',
			'Sep',
			'Oct',
			'Nov',
			'Dic'
		],
		today: 'Hoy',
		clear: 'Borrar'
	};
	get calendar(): any {
		return this._calendar;
	}
}
