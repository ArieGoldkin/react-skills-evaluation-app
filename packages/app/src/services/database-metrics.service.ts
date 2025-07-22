/**
 * Database Metrics Service
 *
 * Handles collection of database-related metrics including:
 * - User activity statistics
 * - Skill and assessment counts
 * - Performance metrics
 */

import { prisma } from "@/lib/db";

export interface DatabaseMetrics {
  connections: number;
  activeQueries: number;
  slowQueries: number;
  totalUsers: number;
  totalSkills: number;
  totalAssessments: number;
  activeUsers: number;
  newUsersToday: number;
  assessmentsToday: number;
  skillsCreatedToday: number;
}

export class DatabaseMetricsService {
  /**
   * Collect comprehensive database metrics
   * @returns Promise<DatabaseMetrics>
   */
  static async collect(): Promise<DatabaseMetrics> {
    try {
      const [
        totalUsers,
        totalSkills,
        totalAssessments,
        activeUsersToday,
        newUsersToday,
        assessmentsToday,
        skillsCreatedToday,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.skill.count(),
        prisma.assessment.count(),
        this.getActiveUsersToday(),
        this.getNewUsersToday(),
        this.getAssessmentsToday(),
        this.getSkillsCreatedToday(),
      ]);

      return {
        connections: 1, // Placeholder - would need connection pool info
        activeQueries: 0, // Placeholder - would need query monitoring
        slowQueries: 0, // Placeholder - would need slow query logging
        totalUsers,
        totalSkills,
        totalAssessments,
        activeUsers: activeUsersToday,
        newUsersToday,
        assessmentsToday,
        skillsCreatedToday,
      };
    } catch (error) {
      console.error("Error collecting database metrics:", error);
      return this.getEmptyMetrics();
    }
  }

  /**
   * Get users active in the last 24 hours
   */
  private static async getActiveUsersToday(): Promise<number> {
    return prisma.user.count({
      where: {
        updatedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
  }

  /**
   * Get users created in the last 24 hours
   */
  private static async getNewUsersToday(): Promise<number> {
    return prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
  }

  /**
   * Get assessments created in the last 24 hours
   */
  private static async getAssessmentsToday(): Promise<number> {
    return prisma.assessment.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
  }

  /**
   * Get skills created in the last 24 hours
   */
  private static async getSkillsCreatedToday(): Promise<number> {
    return prisma.skill.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
  }

  /**
   * Get empty metrics fallback for error cases
   */
  private static getEmptyMetrics(): DatabaseMetrics {
    return {
      connections: 0,
      activeQueries: 0,
      slowQueries: 0,
      totalUsers: 0,
      totalSkills: 0,
      totalAssessments: 0,
      activeUsers: 0,
      newUsersToday: 0,
      assessmentsToday: 0,
      skillsCreatedToday: 0,
    };
  }
}
