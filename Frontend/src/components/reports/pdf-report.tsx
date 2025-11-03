import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { demoData } from "./demo-data";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  kpiContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
  },
  teamContainer: {
    marginTop: 20,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export function PDFReport() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Sales Analytics Report</Text>
          <Text style={styles.text}>Generated on: {currentDate}</Text>

          <View style={styles.kpiContainer}>
            <Text style={styles.subtitle}>Key Performance Indicators</Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>
                  Total Revenue: {formatCurrency(demoData.kpis.totalRevenue.value)}
                </Text>
                <Text style={styles.text}>
                  Trend: {demoData.kpis.totalRevenue.trend}
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>
                  Total Leads: {demoData.kpis.totalLeads.value}
                </Text>
                <Text style={styles.text}>
                  Trend: {demoData.kpis.totalLeads.trend}
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>
                  Conversion Rate: {demoData.kpis.conversionRate.value}
                </Text>
                <Text style={styles.text}>
                  Trend: {demoData.kpis.conversionRate.trend}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.teamContainer}>
            <Text style={styles.subtitle}>Team Performance</Text>
            {demoData.teamMembers.map((member) => (
              <View key={member.id} style={styles.row}>
                <View style={styles.column}>
                  <Text style={[styles.text, styles.bold]}>{member.name}</Text>
                  <Text style={styles.text}>Deals: {member.deals}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.text}>
                    Revenue: {formatCurrency(member.revenue)}
                  </Text>
                  <Text style={styles.text}>
                    Conversion: {member.conversion}%
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Pipeline Overview</Text>
            {demoData.pipelineStages.map((stage) => (
              <View key={stage.stage} style={styles.row}>
                <Text style={styles.text}>
                  {stage.stage}: {stage.count} leads
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
