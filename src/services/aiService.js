/**
 * AI Surplus Intelligence Simulation Service
 * 
 * Provides rule-based algorithms simulating:
 * 1. Demand Forecasting
 * 2. Expiry-Risk Prediction
 * 3. Dynamic Pricing Recommendations
 * 4. Smart Buyer Matching
 * 5. Smart Redistribution Workflows
 * 
 * Note: Clearly labeled as transparent simulation algorithms for the frontend demo,
 * architected for seamless plug-in of future trained ML models / Python microservices.
 */

export const AIService = {
  /**
   * Forecast demand level based on category, quantity, and time of day
   */
  forecastDemand(category, quantity, shelfLifeHours) {
    const highDemandCategories = ['Bakery', 'Prepared Food', 'Dairy'];
    const mediumDemandCategories = ['Vegetables', 'Fruits'];
    
    let baseScore = 50;
    if (highDemandCategories.includes(category)) baseScore += 25;
    if (mediumDemandCategories.includes(category)) baseScore += 15;
    
    if (quantity > 20) baseScore -= 15; // Larger bulk takes longer to absorb
    if (shelfLifeHours <= 12) baseScore += 10; // Urgency stimulates flash buyers
    
    let level = 'Medium';
    let expectedUptakeSpeed = 'Within 4-8 hours';
    let recommendations = 'Standard listing recommended.';

    if (baseScore >= 70) {
      level = 'High';
      expectedUptakeSpeed = 'Within 2-3 hours';
      recommendations = 'High demand anticipated from nearby university and hostel buyers.';
    } else if (baseScore < 45) {
      level = 'Low';
      expectedUptakeSpeed = 'Over 12 hours';
      recommendations = 'Lower natural demand detected. Consider higher bundle discount or NGO redistribution.';
    }

    return {
      score: Math.min(Math.max(baseScore, 10), 99),
      level,
      expectedUptakeSpeed,
      recommendations,
      factors: [
        { label: 'Category Affinity', score: highDemandCategories.includes(category) ? 'Strong' : 'Moderate' },
        { label: 'Inventory Absorption Capacity', score: quantity > 15 ? 'Bulk absorption required' : 'Easy single-buyer absorption' },
        { label: 'Time-of-day Factor', score: 'Evening surplus peak matching active student hours' }
      ]
    };
  },

  /**
   * Calculate Expiry Risk Score and Classification
   */
  assessExpiryRisk(shelfLifeHours, quantity, category) {
    let riskLevel = 'Low Risk';
    let riskScore = 20; // 0-100
    let riskColor = '#24D695';
    let urgencyMessage = 'Item is safe and within standard shelf-life boundaries.';

    if (shelfLifeHours <= 6) {
      riskLevel = 'High Risk';
      riskScore = 90;
      riskColor = '#DC2626';
      urgencyMessage = 'Critical remaining shelf-life (< 6h). Instant flash markdown or NGO handover required immediately.';
    } else if (shelfLifeHours <= 24) {
      riskLevel = 'Medium Risk';
      riskScore = 60;
      riskColor = '#F59E0B';
      urgencyMessage = 'Moderate urgency. Product needs clearance within today to prevent product downgrade.';
    } else {
      riskLevel = 'Low Risk';
      riskScore = 25;
      riskColor = '#24D695';
      urgencyMessage = 'Stable shelf-life. Standard marketplace discovery applies.';
    }

    // Perishability adjustments
    if (['Prepared Food', 'Dairy'].includes(category) && shelfLifeHours <= 12) {
      riskLevel = 'High Risk';
      riskScore = Math.max(riskScore, 85);
      riskColor = '#DC2626';
    }

    return {
      riskLevel,
      riskScore,
      riskColor,
      urgencyMessage,
      remainingHours: shelfLifeHours,
      estimatedLossAvoidance: `Prevents ~₹${Math.round(quantity * 35)} product write-off`
    };
  },

  /**
   * Recommend Dynamic Pricing Discount
   */
  recommendPricing(originalPrice, quantity, shelfLifeHours, category) {
    let suggestedDiscountPct = 25;
    let reason = 'Balanced discount for standard surplus clearance.';

    if (shelfLifeHours <= 6) {
      suggestedDiscountPct = 60;
      reason = 'Critical shelf life (<6h). High 60% clearance discount recommended to guarantee 100% stock rescue before closing.';
    } else if (shelfLifeHours <= 12) {
      suggestedDiscountPct = 50;
      reason = 'Item has less than 12 hours remaining. 50% discount triggers rapid impulse buys from local consumers.';
    } else if (shelfLifeHours <= 24) {
      suggestedDiscountPct = 40;
      reason = '24-hour window. 40% discount balances maximum revenue recovery with swift inventory movement.';
    } else if (quantity >= 20) {
      suggestedDiscountPct = 35;
      reason = 'High bulk volume detected. 35% discount incentivizes hostel mess or group canteen bulk uptake.';
    } else {
      suggestedDiscountPct = 25;
      reason = 'Healthy shelf life remaining. 25% discount offers strong consumer appeal while preserving merchant margin.';
    }

    const discountedPrice = Math.round(originalPrice * (1 - suggestedDiscountPct / 100));

    return {
      suggestedDiscountPct,
      discountedPrice,
      potentialRevenue: discountedPrice * quantity,
      estimatedLossPrevented: (originalPrice - discountedPrice) * quantity,
      confidence: '94%',
      reason,
      simulatedNotice: 'Simulated AI Pricing Engine: Rule-based dynamic optimization model (v1.2 demo).'
    };
  },

  /**
   * Match appropriate potential buyers based on product details
   */
  findBuyerMatches(product, sampleUsers) {
    const matches = [];

    // Check hostel matches
    const hostelUser = sampleUsers.find(u => u.role === 'hostel');
    if (hostelUser) {
      let fitScore = 85;
      let reason = 'High bulk volume consumer with daily meal prep needs.';
      if (['Dairy', 'Bakery', 'Vegetables', 'Packaged Food'].includes(product.category)) {
        fitScore = 96;
        reason = `Direct match with daily hostel mess menu requirement for ${product.category}.`;
      }
      matches.push({
        id: hostelUser.id,
        name: hostelUser.name,
        type: 'Hostel / Institutional Canteen',
        distance: '1.2 km away (Tathawade)',
        fitScore,
        action: 'Send Bulk Flash Offer',
        reason
      });
    }

    // Check NGO match
    const ngoUser = sampleUsers.find(u => u.role === 'ngo');
    if (ngoUser) {
      const isUrgentOrHighRisk = product.expiryHoursRemaining <= 12 || product.quantity >= 10;
      matches.push({
        id: ngoUser.id,
        name: ngoUser.name,
        type: 'Verified NGO / Food Rescue Partner',
        distance: '3.5 km away (Pimpri-Chinchwad)',
        fitScore: isUrgentOrHighRisk ? 92 : 78,
        action: 'Flag for Tax-Deductible Donation',
        reason: isUrgentOrHighRisk 
          ? 'Eligible for instant zero-waste pickup before shelf-life expiry.' 
          : 'Eligible donation partner with verified food-safety logistics.'
      });
    }

    // Local consumer cluster
    matches.push({
      id: 'cluster-consumers-tathawade',
      name: 'Tathawade & Wakad Residential Cluster (1,240 active buyers)',
      type: 'Hyperlocal Consumers',
      distance: '< 2.0 km radius',
      fitScore: 89,
      action: 'Broadcast Proximity Notification',
      reason: 'Active consumers who have saved similar fresh categories in the last 7 days.'
    });

    return matches.sort((a, b) => b.fitScore - a.fitScore);
  },

  /**
   * Recommend smart redistribution pathway
   */
  evaluateRedistribution(product) {
    if (product.expiryHoursRemaining <= 4) {
      return {
        priority: 'Immediate Donation',
        action: 'Redirect to Verified Food Relief NGO',
        recommendedEntity: 'Anandi Seva Trust',
        urgency: 'Critical',
        reason: 'Less than 4 hours shelf life. Commercial sale window has closed. Immediate NGO pickup preserves nutritional value for community shelters.',
        canDonate: true,
        eligibleTaxCredit: true
      };
    } else if (product.expiryHoursRemaining <= 8) {
      return {
        priority: 'Flash Clearance Markdown',
        action: 'Apply Instant 65% Flash Sale',
        recommendedEntity: 'Nearby College Hostels & Tech Park Walk-ins',
        urgency: 'High',
        reason: 'Short shelf life. Recommend 65% discount to clear stock within next 2 hours.',
        canDonate: true,
        eligibleTaxCredit: false
      };
    } else {
      return {
        priority: 'Marketplace Listing',
        action: 'Maintain Standard Surplus Offer',
        recommendedEntity: 'Hyperlocal Retail Consumers',
        urgency: 'Normal',
        reason: 'Sufficient shelf life remaining. Optimal commercial recovery at current discounted rate.',
        canDonate: false,
        eligibleTaxCredit: false
      };
    }
  }
};
