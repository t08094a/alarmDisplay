export interface AlarmContent {
    readonly Alarmzeit?: Date;
    readonly Einsatzort?: string;
    readonly Schlagwort: string;
    readonly Prioritaet?: number;
    readonly Bemerkung?: string;
}
