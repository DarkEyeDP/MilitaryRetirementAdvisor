import { StyleSheet } from '@react-pdf/renderer';

export const C = {
  navy:       '#1d3461',
  navyLight:  '#2a4a80',
  blue:       '#1d4ed8',
  blueLight:  '#dbeafe',
  green:      '#16a34a',
  greenLight: '#dcfce7',
  amber:      '#d97706',
  amberLight: '#fef3c7',
  red:        '#dc2626',
  redLight:   '#fee2e2',
  slate900:   '#0f172a',
  slate700:   '#334155',
  slate500:   '#64748b',
  slate400:   '#94a3b8',
  slate200:   '#e2e8f0',
  slate100:   '#f1f5f9',
  slate50:    '#f8fafc',
  white:      '#ffffff',
};

export const S = StyleSheet.create({
  // Pages
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 0,
    fontSize: 9,
    color: C.slate900,
    backgroundColor: C.white,
    fontFamily: 'Helvetica',
  },

  // Page footer
  footer: {
    position: 'absolute',
    bottom: 14,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: C.slate200,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: C.slate400,
  },

  // Header bar
  headerBar: {
    backgroundColor: C.navy,
    paddingHorizontal: 36,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: C.white,
    fontFamily: 'Helvetica-Bold',
  },
  headerSubtitle: {
    fontSize: 8,
    color: '#93c5fd',
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: C.navyLight,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  headerBadgeText: {
    fontSize: 11,
    color: C.white,
    fontFamily: 'Helvetica-Bold',
  },
  headerBadgeLabel: {
    fontSize: 7,
    color: '#93c5fd',
    marginTop: 1,
  },

  // Section wrapper
  section: {
    paddingHorizontal: 36,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C.navy,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.blueLight,
  },

  // Divider
  divider: {
    height: 0.5,
    backgroundColor: C.slate200,
    marginHorizontal: 36,
    marginBottom: 8,
  },

  // Stat grid (hero row)
  statGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    marginBottom: 2,
  },
  statBox: {
    flex: 1,
    backgroundColor: C.slate50,
    borderRadius: 5,
    padding: 8,
    borderWidth: 0.5,
    borderColor: C.slate200,
  },
  statLabel: {
    fontSize: 7,
    color: C.slate500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  statValue: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: C.slate900,
  },
  statSub: {
    fontSize: 7,
    color: C.slate500,
    marginTop: 2,
  },

  // Two-column layout
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },

  // Gauge container
  gaugeRow: {
    flexDirection: 'row',
    gap: 0,
    marginBottom: 4,
  },
  gaugeCell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRightWidth: 0.5,
    borderRightColor: C.slate200,
  },
  gaugeCellLast: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  gaugeLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.slate700,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  gaugeSubItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 3,
  },
  gaugeSubLabel: {
    fontSize: 7,
    color: C.slate500,
    flex: 1,
  },
  gaugeSubValue: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: C.slate700,
    textAlign: 'right',
  },

  // Score hero (large circle)
  scoreHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 36,
    paddingVertical: 10,
    backgroundColor: C.slate50,
    borderBottomWidth: 0.5,
    borderBottomColor: C.slate200,
  },
  scoreCircleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreTierLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: C.slate900,
    marginBottom: 6,
  },
  scoreTierSub: {
    fontSize: 8,
    color: C.slate500,
    marginBottom: 10,
  },

  // Badges
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
  },

  // Pros / Cons
  prosConsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  prosConsCol: {
    flex: 1,
    backgroundColor: C.slate50,
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.5,
    borderColor: C.slate200,
  },
  prosConsHeader: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  prosConsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 4,
  },
  prosConsBullet: {
    fontSize: 8,
    marginTop: 0.5,
  },
  prosConsText: {
    fontSize: 8,
    color: C.slate700,
    flex: 1,
  },

  // Sub-heading inside a section (block-level, no flex: 1)
  sectionSubHeading: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },

  // Bullet list
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 8,
    color: C.blue,
    marginTop: 0.5,
  },
  bulletText: {
    fontSize: 8,
    color: C.slate700,
    flex: 1,
  },

  // Data table
  dataTable: {
    borderWidth: 0.5,
    borderColor: C.slate200,
    borderRadius: 5,
    overflow: 'hidden',
  },
  dataTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: C.slate200,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dataTableRowLast: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dataTableRowAlt: {
    backgroundColor: C.slate50,
  },
  dataTableLabel: {
    fontSize: 8,
    color: C.slate500,
    flex: 1,
  },
  dataTableValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.slate900,
    textAlign: 'right',
  },

  // Three-metric hero row (housing / employment)
  metricHeroRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  metricCard: {
    flex: 1,
    backgroundColor: C.slate50,
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.5,
    borderColor: C.slate200,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: C.slate900,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 7,
    color: C.slate500,
    textAlign: 'center',
  },

  // Climate grid (2×3)
  climateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  climateCell: {
    width: '31.5%',
    backgroundColor: C.slate50,
    borderRadius: 4,
    padding: 8,
    borderWidth: 0.5,
    borderColor: C.slate200,
  },
  climateCellLabel: {
    fontSize: 7,
    color: C.slate500,
    marginBottom: 2,
  },
  climateCellValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: C.slate900,
  },

  // Comparison table
  compTableHeader: {
    flexDirection: 'row',
    backgroundColor: C.navy,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  compTableHeaderCell: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.white,
    textAlign: 'center',
  },
  compTableHeaderCellLeft: {
    flex: 1.4,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.white,
  },
  compTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: C.slate200,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  compTableRowAlt: {
    backgroundColor: C.slate50,
  },
  compTableCell: {
    flex: 1,
    fontSize: 8,
    color: C.slate900,
    textAlign: 'center',
  },
  compTableCellLeft: {
    flex: 1.4,
    fontSize: 8,
    color: C.slate500,
  },
  compTableCellBold: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.slate900,
    textAlign: 'center',
  },
  compSectionLabel: {
    flexDirection: 'row',
    backgroundColor: C.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: C.slate200,
  },
  compSectionLabelText: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: C.navy,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
